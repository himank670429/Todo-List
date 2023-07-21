const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000

const {getUserData} = require('./Database/userDataApi');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);

app.use(express.json())
app.use(cors({
    origin : require('./config/allowedOrigins'),
}))

app.post('/auth/login/', (req, res) => {
    
})

app.get('/api/user/:id', (req, res) => {
    getUserData(req.params.id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(401).send({message : err.message}))
})


app.listen(port)