import { baseUrl } from "./config";

export async function getUserData(){
    const res = await fetch(`${baseUrl}/api/user/64ba5abf88741bd457e8b4b7`)
    const data = await res.json()    
    return data;
}  