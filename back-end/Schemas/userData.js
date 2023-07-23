const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    email : {type : String, required : true},
    username: { type: String, required: true },
    avatar: { type: String},
    tasks: {type : [taskGroupSchema], default : []}
}, {
    collection : 'UserData'
});

module.exports = mongoose.model('UserData', userDataSchema);