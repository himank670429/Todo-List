import { baseUrl } from "./config";
import axios from 'axios';
export async function addTaskGroupfetch(id, title, theme, date){
    const res = await axios.post(`${baseUrl}/api/user/taskGroup/add`, {
        id,
        title, 
        theme, 
        date
    })
    return res.data;
}

export async function deleteTaskGroupfetch(id, taskGroupId){
    const res = await axios.delete(`${baseUrl}/api/user/taskGroup/del`, {data :{
        id,
        taskGroupId
    }})
    return res.data;
}

export async function addTask(id, taskGroupIndex, desc, date){
    const res = await axios.post(`${baseUrl}/api/user/task/add`, {
        id,
        taskGroupIndex, 
        desc, 
        date
    })
    return res.data;
}

export async function deleteTask(id, taskGroupIndex, taskId, isCurrent){
    const res = await axios.delete(`${baseUrl}/api/user/task/del`, {data : {
        id,
        taskGroupIndex,
        taskId,
        isCurrent,
    }})
    return res.data;
}
export async function markTask(id, taskGroupIndex, taskId, isCurrent){
    const res = await axios.put(`${baseUrl}/api/user/task/mark`, {
        id,
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