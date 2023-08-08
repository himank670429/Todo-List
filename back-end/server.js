const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3001
const http = require('http')
const {Server} = require('socket.io')
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);


const jwt = require('jsonwebtoken')

// local libraries
const {
    addTaskGroup, 
    deleteTaskGroup,
    addTask,
    deleteTask,
    markTask
} = require('./controller/Database/userDataApi');

const {upSertUser, findUser} = require('./controller/Database/userApi')

const {getGoogleUser} = require("./controller/auth/googleAuth");

const {
    getCache, 
    setCache, 
    getCacheData,    
    addSocketInstance,
    getSocketInstances,
    removeSocketInstance,
    addDashboardSocketInstance,
    removeDashBoardSocketInstance,
    getDashboardInstance,
} = require('./controller/cache/localCache');

// setups 
app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin : require('./model/config/allowedOrigins')
}))
const server = http.createServer(app)
const io = new Server(server, {
    cors : {
        origin : require('./model/config/allowedOrigins'),
        methods : ["GET, POST"]
    }
})

// cache
const getOrsetCache = async (key, callback) => {
    const user = getCache(key);
    if (user){
        return user;
    }
    const freshData = await callback();
    setCache(key, freshData)
    return freshData;
}

// server
io.on('connection', socket => {
    socket.on('api-user-connect', async (id) => {
        await getOrsetCache(id, async () => await findUser(id))
        addSocketInstance(id, socket.id)
        // emit to all the connected dashboards sockets
        getDashboardInstance().forEach(socket_id => io.to(socket_id).emit('get-local-cache', getCacheData()))
    })
    socket.on('api-user-taskGroup-add', async (id, title, theme, date, cb) => {
        const user = await getOrsetCache(id, async () => await findUser(id))
        try{
            const data = await addTaskGroup(user, title, theme, date)
            cb(data.tasks, null)
            const all_sockets = getSocketInstances(id)
            all_sockets.forEach(socket_id => {
                if (socket_id === socket.id) return
                io.to(socket_id).emit('api-user-update-instance', data.tasks, 'taskGroup-add')
            })
        }
        catch(error){
            cb(null, error)
        }
    })

    socket.on('api-user-taskGroup-del', async (id, taskGroupId, cb) => {
        const user = await getOrsetCache(id, async () => await findUser(id))
        try{
            const data = await deleteTaskGroup(user, taskGroupId)
            cb(data.tasks, null)
            const all_sockets = getSocketInstances(id)
            all_sockets.forEach(socket_id => {
                if (socket_id === socket.id) return
                io.to(socket_id).emit('api-user-update-instance', data.tasks, 'taskGroup-del')
            })
        }
        catch(error){
            console.log(error)
            cb(null, error)
        }
    })  

    socket.on('api-user-task-add', async (id, taskGroupIndex, desc, date, cb) => {
        const user = await getOrsetCache(id, async () => await findUser(id))
        try{
            const data = await addTask(user, taskGroupIndex, desc, date)
            cb(data.tasks[taskGroupIndex].current, null)
            const all_sockets = getSocketInstances(id)
            all_sockets.forEach(socket_id => {
                if (socket_id === socket.id) return
                io.to(socket_id).emit('api-user-update-instance', data.tasks, 'task-add')
            })
        }
        catch(error){
            cb(null, error)
        }
    })

    socket.on('api-user-task-del', async (id, taskGroupIndex, taskId, isCurrent, cb) => {
        const user = await getOrsetCache(id, async () => await findUser(id))
        try{
            const data = await deleteTask(user, taskGroupIndex, taskId, isCurrent)
            cb((isCurrent) ? data.tasks[taskGroupIndex].current : data.tasks[taskGroupIndex].completed, null)
            const all_sockets = getSocketInstances(id)
            all_sockets.forEach(socket_id => {
                if (socket_id === socket.id) return
                io.to(socket_id).emit('api-user-update-instance', data.tasks, 'task-del')
            })
        }
        catch(error){
            cb(null, error)
        }
    })

    socket.on('api-user-task-mark', async (id, taskGroupIndex, taskId, isCurrent, cb) => {
        const user = await getOrsetCache(id, async () => await findUser(id))
        try{
            console.log(taskGroupIndex, taskId)
            const data = await markTask(user, taskGroupIndex, taskId, isCurrent)
            cb(data.tasks[taskGroupIndex], null)
            console.log(data.tasks[taskGroupIndex])
            const all_sockets = getSocketInstances(id)
            all_sockets.forEach(socket_id => {
                if (socket_id === socket.id) return
                io.to(socket_id).emit('api-user-update-instance', data.tasks, 'task-mark')
            })
        }
        catch(error){
            console.log(error)
            cb(null, error)
        }
    })
    socket.on('get-local-cache', (access_token, cb) => {
        const data = jwt.decode(access_token)
        if (data === process.env.DASHBOARD_ID){
            addDashboardSocketInstance(socket.id)
            cb(getCacheData())
        }
    })
    // user disconnects
    socket.on('disconnect', () => {
        removeSocketInstance(socket.id)
        removeSocketInstance(socket.id)
    })
})  

app.post('/api/login/google', async (req, res) => {
    const {access_token} = req.body;
    try{
        const {email, name, picture} = await getGoogleUser(access_token)
        const user = await upSertUser(email, name, picture)
        res.status(200).send(user)
    }
    catch(error){
        if (error.reponse.status === 401) res.status(401).send({message : "unauthorized access"})
        else res.status(500).send({message : "internal server error"})
    }
})


app.get('/api/login/dashboard', (req, res) => {
    const {id} = req.query;
    if (id === process.env.DASHBOARD_ID){
        const signed_token = jwt.sign(id, process.env.TOKEN_SECRET)
        res.status(200).send({valid : true, access_token : signed_token})
    }
    else{
        res.status(401).send({valid : false})
    }
})

server.listen(port)