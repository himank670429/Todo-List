const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

const {
    getUserData, 
    addTaskGroup, 
    deleteTaskGroup,
    addTask,
    deleteTask,
    markTask
} = require('./Database/userDataApi');

const {upSertUser} = require('./Database/userApi')

const {getGoogleUser} = require("./auth/googleAuth");

app.use(express.json())
app.use(cors({
    origin : require('./config/allowedOrigins')
}))

app.get('/api/login/google', async (req, res) => {
    const {access_token} = req.query;
    const {email, name, picture} = await getGoogleUser(access_token)
    const user = await upSertUser(email, name, picture)
    res.send(user)
})

app.get('/api/user', (req, res) => {
    getUserData(req.query.userId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.post('/api/user/taskGroup/add', (req, res) => {
    addTaskGroup(req.body.userId, req.body.title, req.body.theme, req.body.date)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.delete('/api/user/taskGroup/del', (req, res) => {
    deleteTaskGroup(req.body.userId, req.body.taskGroupId)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.post('/api/user/task/add/', (req, res) => {
    addTask(req.body.userId, req.body.taskGroupIndex, req.body.desc, req.body.date)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.delete('/api/user/task/del/', (req, res) => {
    deleteTask(req.body.userId, req.body.taskGroupIndex, req.body.taskId, req.body.isCurrent)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.put('/api/user/task/mark', (req, res) => {
    markTask(req.body.userId, req.body.taskGroupIndex, req.body.taskId, req.body.isCurrent)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})

app.listen(port)