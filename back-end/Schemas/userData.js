const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: String, required: true },
});
  
const taskGroupSchema = new mongoose.Schema({
    card: {
        title: { type: String, required: true },
        date: { type: String, required: true },
        theme: { type: String, required: true },
    },
    current: {type : [taskSchema], default : []},
    completed: {type : [taskSchema], default : []},
})

const userDataSchema = new mongoose.Schema({
    username: { type: String, required: true },
    avatar: { type: String, default: null },
    tasks: {type : [taskGroupSchema], default : []}
}, {
    collection : 'UserData'
});

module.exports = mongoose.model('UserData', userDataSchema);