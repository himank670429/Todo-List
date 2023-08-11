const userCache = {}
const socketCache = {}
let dashboardSockets = []

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
    const transformedData = {};
    for (const userEmail in userCache) {
        const socketInstances = userCache[userEmail].socket_instance;
        transformedData[userEmail] = socketInstances;
    }
    return transformedData
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
        try{
            userCache[key].socket_instance = userCache[key].socket_instance.filter(id => id!==socket_id)
            if (userCache[key].socket_instance.length === 0){
                setInterval(() => {
                    delete userCache[key]
                }, 300000); // delete the user after 5 mins
            }
            delete socketCache[socket_id]
        }
        catch(error){
            // when user connected but does not registers will noe have any socket instance
            console.log('unable to remove socket instance unregistered user')
        }
    }
}
function getDashboardInstance(){
    return [...dashboardSockets]
}

function addDashboardSocketInstance(id){
    if (dashboardSockets.includes(id)) return
    dashboardSockets.push(id)
}
function removeDashBoardSocketInstance(id){
    dashboardSockets = dashboardSockets.filter(item => item !== id)
}

module.exports = {
    setCache, 
    getCache, 
    deleteCache, 
    getCacheData,
    addSocketInstance,
    checkSocketInstance,
    removeSocketInstance,
    getSocketInstances,
    addDashboardSocketInstance,
    removeDashBoardSocketInstance,
    getDashboardInstance,
}