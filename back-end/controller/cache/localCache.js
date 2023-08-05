const userCache = {}
const socketCache = {}

function setCache(key, value){
    userCache[key] = {
        user_instance : value,
        socket_instance : []
    }
}
function getCache(key){
    const value = userCache[key];
    if (value) return value.user_instance;
    return null;
}
function deleteCache(key){
    delete userCache[key];
}
function getCacheData(){
    return {...userCache}
}

function addSocketInstance(key, socket_id){
    if (checkSocketInstance(key, socket_id)){
        return
    }
    userCache[key].socket_instance.push(socket_id)
    socketCache[socket_id] = key
}

function getSocketInstances(key){
    if (getCache(key)){
        return userCache[key].socket_instance
    }
}

function checkSocketInstance(key, socket_id){
    return userCache[key].socket_instance.includes(socket_id)
}

function removeSocketInstance(socket_id){
    const key = socketCache[socket_id]
    if (key){
        userCache[key].socket_instance = userCache[key].socket_instance.filter(id => id!==socket_id)
        if (userCache[key].socket_instance.length === 0){
            delete userCache[key]
        }
        delete socketCache[socket_id]
    }

}

// function 

module.exports = {
    setCache, 
    getCache, 
    deleteCache, 
    getCacheData,
    addSocketInstance,
    checkSocketInstance,
    removeSocketInstance,
    getSocketInstances,
}

/*
cahce = {
    user_email = {
        socket_instances = [
            SOCKET_ID_1,
            SOCKET_ID_2,
            SOCKET_ID_3,
            SOCKET_ID_4,
        ]
        user_instance = {
            USER_DATA
        }
    },

    user_email = {
        socket_instances = [
            SOCKET_ID_1,
            SOCKET_ID_2,
            SOCKET_ID_3,
            SOCKET_ID_4,
        ]
        user_instance = {
            USER_DATA
        }
    },

    user_email = {
        socket_instances = [
            SOCKET_ID_1,
            SOCKET_ID_2,
            SOCKET_ID_3,
            SOCKET_ID_4,
        ]
        user_instance = {
            USER_DATA
        }
    },
}

socketCache = {
    socket_id : user_email
}
*/