export default function useDate(){
    const date = new Date()
    return {
        sec : date.getSeconds(),
        min : date.getMinutes(),
        hour : date.getHours(),
        day : date.getDate(),
        month : date.getMonth()+1,
        year : date.getFullYear(),
    }
}