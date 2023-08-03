const cache = {}
function setCache(key, value){
    cache[key] = value;
}
function getCache(key){
    const value = cache[key];
    if (value) return value;
    return null;
}
function deleteCache(key){
    delete cache[key];
}
module.exports = {setCache, getCache, deleteCache}