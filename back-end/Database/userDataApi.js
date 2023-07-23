const UserData = require('../Schemas/userData')

module.exports = {
    getUserData : async (id) => {
        return await UserData.findById(id);
    },
    addTaskGroup : async (userId, title, theme, date) =>{
        const userInstance = await UserData.findById(userId);
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
        return userInstance.tasks;
    },
    deleteTaskGroup : async (userId, taskGroupId) => {
        const userInstance = await UserData.findById(userId);
        userInstance.tasks = userInstance.tasks.filter(item => item.id !== taskGroupId)
        await userInstance.save();
        return userInstance.tasks;
    },

    addTask : async (userId, taskGroupIndex, desc, date) => {
        const userInstance = await UserData.findById(userId);
        userInstance.tasks[taskGroupIndex].current.push({desc, date})
        await userInstance.save();
        return userInstance.tasks[taskGroupIndex].current;
    },

    deleteTask : async (userId, taskGroupIndex, taskId, isCurrentTask) => {
        const userInstance = await UserData.findById(userId);
        if (isCurrentTask){
            userInstance.tasks[taskGroupIndex].current = userInstance.tasks[taskGroupIndex].current.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance.tasks[taskGroupIndex].current;
        }
        else{
            userInstance.tasks[taskGroupIndex].completed = userInstance.tasks[taskGroupIndex].completed.filter(item => item.id !== taskId)
            await userInstance.save();
            return userInstance.tasks[taskGroupIndex].completed;
        }
    },

    markTask : async (userId, taskGroupIndex, taskId, isCurrentTask) => {
        const userInstance = await UserData.findById(userId);
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
        return userInstance.tasks[taskGroupIndex]
    },
}