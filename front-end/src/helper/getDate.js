export default function getDate(){
    const date = new Date()
    return {
        milsec : date.getMilliseconds(),
        sec : date.getSeconds(),
        min : date.getMinutes(),
        hour : date.getHours(),
        day : date.getDate(),
        month : date.getMonth()+1,
        year : date.getFullYear(),
    }
}