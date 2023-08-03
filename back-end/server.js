const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

const {
    addTaskGroup, 
    deleteTaskGroup,
    addTask,
    deleteTask,
    markTask
} = require('./Database/userDataApi');

const {upSertUser, findUser} = require('./Database/userApi')

const {getGoogleUser} = require("./auth/googleAuth");

const {getCache, setCache, debug} = require('./cache/localCache')

app.use(express.json())
app.use(cors({
    origin : require('./config/allowedOrigins')
}))

const getOrsetCache = async (key, callback) => {
    const user = getCache(key);
    if (user){
        return user;
    }
    const freshData = await callback();
    setCache(key, freshData)
    return freshData;
}

app.get('/api/login/google', async (req, res) => {
    const {access_token} = req.query;
    const {email, name, picture} = await getGoogleUser(access_token)
    const user = await getOrsetCache(email, async () => await upSertUser(email, name, picture))
    return res.status(200).send(user)
})

app.post('/api/user/taskGroup/add', async (req, res) => {
    const {id, title, theme, date} = req.body;
    const user = await getOrsetCache(id, async () => await findUser(id))
    console.log('add taskgroup', id, user, req.body)
    try{
        const data = await addTaskGroup(user, title, theme, date)
        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(401).send({message : error})
    }
})

app.delete('/api/user/taskGroup/del', async (req, res) => {
    const {id, taskGroupId} = req.body;
    const user = await getOrsetCache(id, async () => await findUser(id))
    console.log('delete taskgroup ',id, user, req.body)
    try{
        const data = await deleteTaskGroup(user, taskGroupId)
        res.status(200).send(data);
    }
    catch(error){
        console.log(error)
        res.status(401).send({message : error});
    }
})

app.post('/api/user/task/add/', async (req, res) => {
    const {id, taskGroupIndex, desc, date} = req.body;
    const user = await getOrsetCache(id, async () => await findUser(id))
    try{
        const data = await addTask(user, taskGroupIndex, desc, date)
        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(401).send({message : error})
    }
})

app.delete('/api/user/task/del/', async (req, res) => {
    const {id, taskGroupIndex, taskId, isCurrent} = req.body;
    const user = await getOrsetCache(id, async () => await findUser(id))
    try{
        const data = await deleteTask(user, taskGroupIndex, taskId, isCurrent)
        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(401).send({message : err.message})
    }
})

app.put('/api/user/task/mark', async (req, res) => {
    const {id, taskGroupIndex, taskId, isCurrent} = req.body;
    const user = await getOrsetCache(id, async () => await findUser(id))
    try{
        const data = await markTask(user, taskGroupIndex, taskId, isCurrent)
        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(401).send({message : err.message})
    }
})

app.listen(port)