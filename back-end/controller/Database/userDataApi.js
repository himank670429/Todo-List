const UserData = require('../../model/Schemas/userData')

module.exports = {
    addTaskGroup : async (userInstance, title, theme, date) =>{
        userInstance.tasks.push({
            card: {
                title,
                theme,
                date,
            },
            current : [],
            completed : [],
        })
        await userInstance.save()
        return userInstance;
    },
    deleteTaskGroup : async (userInstance, taskGroupId) => {
        userInstance.tasks = userInstance.tasks.filter(item => item.id !== taskGroupId)
        await userInstance.save();
        return userInstance;
    },
    addTask : async (userInstance, taskGroupId, desc, date) => {
        userInstance.tasks.find(obj => obj.id === taskGroupId).current.push({desc, date})
        await userInstance.save();
        return userInstance;
    },
    deleteTask : async (userInstance, taskGroupId, taskId, isCurrentTask) => {
        const taskGroupToBeModify = userInstance.tasks.find(obj => obj.id === taskGroupId)
        if (isCurrentTask){
            taskGroupToBeModify.current = taskGroupToBeModify.current.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance;
        }
        else{
            taskGroupToBeModify.current = taskGroupToBeModify.current.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance;
        }
    },
    markTask : async (userInstance, taskGroupId, taskId, isCurrentTask) => {
        const taskGroupToBeModify = userInstance.tasks.find(obj => obj.id === taskGroupId)
        let taskToBeMarked;
        if (isCurrentTask){
            taskToBeMarked = taskGroupToBeModify.current.find(task => task.id === taskId)
            taskGroupToBeModify.current = taskGroupToBeModify.current.filter(item => item.id !== taskId)
            if (taskToBeMarked) taskGroupToBeModify.completed.push(taskToBeMarked);
        }
        else{
            taskToBeMarked = taskGroupToBeModify.completed.find(task => task.id === taskId)
            taskGroupToBeModify.completed = taskGroupToBeModify.completed.filter(item => item.id !== taskId)
            if (taskToBeMarked) taskGroupToBeModify.current.push(taskToBeMarked);
        }
        await userInstance.save();
        return userInstance;
    },
}