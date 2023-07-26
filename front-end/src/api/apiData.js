import { baseUrl } from "./config";
import axios from 'axios';
export async function addTaskGroupfetch(userId, title, theme, date){
    const res = await axios.post(`${baseUrl}/api/user/taskGroup/add`, {
        userId,
        title, 
        theme, 
        date
    })
    return res.data;
}

export async function deleteTaskGroupfetch(userId, taskGroupId){
    const res = await axios.delete(`${baseUrl}/api/user/taskGroup/del`, {data :{
        userId,
        taskGroupId
    }})
    return res.data;
}

export async function addTask(userId, taskGroupIndex, desc, date){
    const res = await axios.post(`${baseUrl}/api/user/task/add`, {
        userId,
        taskGroupIndex, 
        desc, 
        date
    })
    return res.data;
}

export async function deleteTask(userId, taskGroupIndex, taskId, isCurrent){
    const res = await axios.delete(`${baseUrl}/api/user/task/del`, {data : {
        userId,
        taskGroupIndex,
        taskId,
        isCurrent,
    }})
    return res.data;
}
export async function markTask(userId, taskGroupIndex, taskId, isCurrent){
    const res = await axios.put(`${baseUrl}/api/user/task/mark`, {
        userId,
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