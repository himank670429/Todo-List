import getDate from "../helper/getDate";
import { useState, createContext, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../helper/getCookie";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
import axios from 'axios';
export const DataContext = createContext();

function DataProvider({children}){
    const [socket, setSocket] = useState(io.connect(process.env.REACT_APP_SERVER_URL))
    const {pathname} = useLocation();
    const navigate = useNavigate();    
    useEffect(() => {
        if (pathname === '/Login' || pathname === '/'){
            const access_token = getCookie('access-token');
            if (access_token){
                const decodedValue = decodeURIComponent(access_token)
                login(decodedValue)
                .then(data => {
                    setAppData(data)
                    navigate('/Home')
                })
            }
            else{
                navigate('/Login')
            }
        }
    }, [navigate, pathname, socket])


    const [appData, setAppData] = useState(null)
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    async function login(access_token){
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/google`, {access_token})
        return res.data
    }
    // app operation 
    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year} = getDate();
        const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`
        
        socket.emit('api-user-taskGroup-add', appData.email, category, hexValue, date_string, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks = data
                return updated_value;
            })
        })
    }   

    function deleteTaskGroup(){
        socket.emit('api-user-taskGroup-del', appData.email, currentGroupToBeDeletedId, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks = data
                return updated_value
            })
        })
    }

    function addCurrentTask(desc, date){
        socket.emit('api-user-task-add', appData.email, currentGroupIndex, desc, date, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].current = data
                return updated_value
            })
        })
    }

    function deleteCompletedTask(taskid){
        socket.emit('api-user-task-del', appData.email, currentGroupIndex, taskid, false, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].completed = data
                return updated_value
            })
        })
    }
    
    function deleteCurrentTask(taskid){
        socket.emit('api-user-task-del', appData.email, currentGroupIndex, taskid, true, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].current = data
                return updated_value
            })
        })
    }

    function markTaskAsDone(taskid){
        socket.emit('api-user-task-mark', appData.email, currentGroupIndex, taskid, true, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data
                return updated_value
            })
        }) 
    }

    function markTaskAsNoteDone(taskid){
        socket.emit('api-user-task-mark', appData.email, currentGroupIndex, taskid, false, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data
                return updated_value
            })
        }) 
    }

    const taskCategoryCreateRef = useRef();
    const taskCategoryDeleteRef = useRef();
    
    return <DataContext.Provider value={{
        appData, 
        setAppData,
        currentGroupIndex,
        setCurrentGroupIndex,
        
        taskCategoryCreateRef,
        taskCategoryDeleteRef,

        currentGroupToBeDeletedId,
        setCurrentGroupToBeDeletedId,

        addTaskGroup,
        deleteTaskGroup,

        addCurrentTask,
        deleteCurrentTask,
        deleteCompletedTask,
        markTaskAsDone,
        markTaskAsNoteDone,

        login,
        socket,
    }}>
        {children}
    </DataContext.Provider>
}

const MemoizedDataProvider = React.memo(DataProvider);

export default MemoizedDataProvider;