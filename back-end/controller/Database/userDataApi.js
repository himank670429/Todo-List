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
    addTask : async (userInstance, taskGroupIndex, desc, date) => {
        userInstance.tasks[taskGroupIndex].current.push({desc, date})
        await userInstance.save();
        return userInstance;
    },
    deleteTask : async (userInstance, taskGroupIndex, taskId, isCurrentTask) => {
        if (isCurrentTask){
            userInstance.tasks[taskGroupIndex].current = userInstance.tasks[taskGroupIndex].current.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance;
        }
        else{
            userInstance.tasks[taskGroupIndex].completed = userInstance.tasks[taskGroupIndex].completed.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance;
        }
    },
    markTask : async (userInstance, taskGroupIndex, taskId, isCurrentTask) => {
        let taskToBeMarked;
        if (isCurrentTask){
            userInstance.tasks[taskGroupIndex].current.forEach(item => {
                if (item.id === taskId)
                    taskToBeMarked = item
            });
            userInstance.tasks[taskGroupIndex].current = userInstance.tasks[taskGroupIndex].current.filter(item => item.id !== taskId)
            userInstance.tasks[taskGroupIndex].completed.push(taskToBeMarked);
        }
        else{
            userInstance.tasks[taskGroupIndex].completed.forEach(item => {
                if (item.id === taskId)
                    taskToBeMarked = item
            });
            userInstance.tasks[taskGroupIndex].completed = userInstance.tasks[taskGroupIndex].completed.filter(item => item.id !== taskId)
            userInstance.tasks[taskGroupIndex].current.push(taskToBeMarked);  
        }
        await userInstance.save();
        return userInstance;
    },
}