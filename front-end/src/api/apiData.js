import { baseUrl } from "./config";
import axios from 'axios';
const id = '64bceef1911ca71a81231e2d'


export async function getUserData(){
    const res = await axios.get(`${baseUrl}/api/user`, {
        params : {
            userId : id,
        }
    })
    return res.data;
}  

export async function addTaskGroupfetch(title, theme, date){
    const res = await axios.post(`${baseUrl}/api/user/taskGroup/add`, {
        userId : id,
        title, 
        theme, 
        date
    })
    return res.data;
}

export async function deleteTaskGroupfetch(taskGroupId){
    const res = await axios.delete(`${baseUrl}/api/user/taskGroup/del`, {data :{
        userId : id,
        taskGroupId
    }})
    return res.data;
}

export async function addTask(taskGroupIndex, desc, date){
    const res = await axios.post(`${baseUrl}/api/user/task/add`, {
        userId : id,
        taskGroupIndex, 
        desc, 
        date
    })
    return res.data;
}

export async function deleteTask(taskGroupIndex, taskId, isCurrent){
    const res = await axios.delete(`${baseUrl}/api/user/task/del`, {data : {
        userId : id,
        taskGroupIndex,
        taskId,
        isCurrent,
    }})
    return res.data;
}
export async function markTask(taskGroupIndex, taskId, isCurrent){
    const res = await axios.put(`${baseUrl}/api/user/task/mark`, {
        userId : id,
        taskGroupIndex,
        taskId,
        isCurrent,
    })
    return res.data;
}

export async function login(access_token){
    const qs = new URLSearchParams({access_token})
    const res = await axios.get(`${baseUrl}/api/login/google?${qs.toString()}`)
    return res.data
}