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
    const [socket, setSocket] = useState(null)
    const [appData, setAppData] = useState(null)
    const {pathname} = useLocation();
    const [connected, setConnected] = useState([false, false]);
    const navigate = useNavigate();    
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    useEffect(() => {
        const newSocket = io.connect(process.env.REACT_APP_SERVER_URL);
        setSocket(newSocket);
        setConnected(prev => {
            const updated_data = [...prev]
            updated_data[0] = true
            return updated_data;
        })
        return () => {
            setConnected(prev => {
                const updated_data = [...prev]
                updated_data[0] = false
                return updated_data;
            })
            newSocket.disconnect();
        };
    }, []); 


    useEffect(() => {
        if (pathname === '/Login' || pathname === '/'){
            const access_token = getCookie('access-token');
            if (access_token){
                const decodedValue = decodeURIComponent(access_token)
                login(decodedValue)
                .then(data => {
                    setAppData(data)
                    navigate('/Home')
                    setConnected(prev => {
                        const updated_data = [...prev]
                        updated_data[1] = true
                        return updated_data
                    })
                })
            }
            else{
                navigate('/Login')
            }
        }
    }, [navigate, pathname, socket])

    useEffect(() => {
        if (connected[0] && connected[1]){
            socket.on('connect', () => {
                socket.emit("api-user-connect", appData.email)
            })
            socket.emit("api-user-connect", appData.email)
        }
    },[connected])

    useEffect(() => {
        if (!socket){return}
        socket.on('api-user-update-instance', (data, action_string) => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks = data
                if (pathname === '/Task' && action_string === 'taskGroup-del'){
                    navigate('/Home')
                }
                return updated_value;
            })
        })
    }, [socket, navigate, pathname])

    async function login(access_token){
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/google`, {access_token})
        return res.data
    }

    // app operation 
    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year, hour, min, sec, milsec} = getDate();
        const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}/${addZeroes(
            milsec + 1000*sec + 1000*60*min + 1000*60*60*hour
        )}`
        
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
            console.log(data)
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

        connected, 
        setConnected,
        login,
        socket,
        setSocket,
    }}>
        {children}
    </DataContext.Provider>
}

const MemoizedDataProvider = React.memo(DataProvider);

export default MemoizedDataProvider;