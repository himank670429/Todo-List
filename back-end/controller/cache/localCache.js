const userCache = {}
const socketCache = {}
let dashboardSockets = []

function setCache(key, value){
    try{
        userCache[key] = {
            user_instance : value,
            socket_instance : []
        }
    }catch(error){
        throw new Error(error?.message)
    }
}
function getCache(key){
    try{

        const value = userCache[key];
        if (value) return value.user_instance;
        return null;
    }catch(error){
        throw new Error(error?.message)
    }
}
function deleteCache(key){
    try{
        delete userCache[key];
    }
    catch(error){
        throw new Error(error?.message)
    }
}
function getCacheData() {
    try {
        const transformedData = {};
        for (const userEmail in userCache) {
            const socketInstances = userCache[userEmail].socket_instance;
            transformedData[userEmail] = socketInstances;
        }
        return transformedData;
    } catch (error) {
        throw new Error(error?.message);
    }
}

function addSocketInstance(key, socket_id) {
    try {
        if (checkSocketInstance(key, socket_id)) {
            return;
        }
        userCache[key].socket_instance.push(socket_id);
        socketCache[socket_id] = key;
    } catch (error) {
        throw new Error(error?.message);
    }
}

function getSocketInstances(key) {
    try {
        if (getCache(key)) {
            return userCache[key].socket_instance;
        }
    } catch (error) {
        throw new Error(error?.message);
    }
}

function checkSocketInstance(key, socket_id) {
    try {
        return userCache[key].socket_instance.includes(socket_id);
    } catch (error) {
        throw new Error(error?.message);
    }
}

function removeSocketInstance(socket_id) {
    try {
        const key = socketCache[socket_id];
        if (key) {
            userCache[key].socket_instance = userCache[key].socket_instance.filter(id => id !== socket_id);
            if (userCache[key].socket_instance.length === 0) {
                setInterval(() => {
                    delete userCache[key];
                }, 300000); // delete the user after 5 mins
            }
            delete socketCache[socket_id];
        }
    } catch (error) {
        throw new Error(error?.message);
    }
}

function getDashboardInstance() {
    try {
        return [...dashboardSockets];
    } catch (error) {
        throw new Error(error?.message);
    }
}

function addDashboardSocketInstance(id) {
    try {
        if (dashboardSockets.includes(id)) return;
        dashboardSockets.push(id);
    } catch (error) {
        throw new Error(error?.message);
    }
}

function removeDashBoardSocketInstance(id) {
    try {
        dashboardSockets = dashboardSockets.filter(item => item !== id);
    } catch (error) {
        throw new Error(error?.message);
    }
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