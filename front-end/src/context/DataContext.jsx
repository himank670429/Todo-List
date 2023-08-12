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
    const navigate = useNavigate();    
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);
    const [socketToken, setSocketToken] = useState(null)
    const [connectionStatus, setConnectionStatus] = useState({ // create connection only when the both the thing are available
        app_data : false,
        socket_token : false,
    })

    useEffect(() => {
        if (connectionStatus.app_data && connectionStatus.socket_token){
            // now create a new connection and register it self to the server
            const new_socket = io.connect(process.env.REACT_APP_SERVER_URL, {
                query : {
                    token : socketToken
                }
            });
            new_socket.emit('api-user-connect', appData?.email)

            // set it to state
            setSocket(new_socket)

            // delete connection when app closes
            return () => {
                new_socket.disconnect();
            }
        }
    }, [connectionStatus])
    
    useEffect(() => {
        if (!appData) return
        if (!socket) return
        socket.on('connect', () => {
            socket.emit('api-user-connect', appData?.email)
        })
    }, [socket, appData])

    useEffect(() => {
        if (socketToken){
            setConnectionStatus(prev => ({
                ...prev,
                socket_token : true,
            }))
        }
    },[socketToken])

    useEffect(() => {
        if (pathname === '/Login' || pathname === '/'){
            const access_token = getCookie('access-token');
            const socket_token = getCookie('socket-token')
            // const socket
            if (access_token && socket_token){
                // retrieve user data from api/ one time fetch
                const decodedValue = decodeURIComponent(access_token)
                login(decodedValue)
                .then(({data, token}) => {
                    setAppData(data)
                    setSocketToken(token)
                    setConnectionStatus(prev => ({
                        ...prev, 
                        app_data : true,
                    }))
                    navigate('/Home')
                })
                .catch(error => {
                    console.log(error)
                })
            }
            else{
                navigate('/Login')
            }
        }
    }, [navigate, pathname])

    useEffect(() => {
        if (!socket){return}
        socket.on('api-user-update-instance', (data) => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks = data
                return updated_value;
            })
        })
    }, [socket, navigate, pathname])

    // helper function 
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
        socket.emit('api-user-task-add', appData.email, currentGroupId, desc, date, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                const taskIndexToUpdate = updated_value.tasks.findIndex(task => task._id === currentGroupId);
                if (taskIndexToUpdate !== -1){
                    updated_value.tasks[taskIndexToUpdate].current = data
                }
                return updated_value
            })
        })
    }

    function deleteCompletedTask(taskid){
        socket.emit('api-user-task-del', appData.email, currentGroupId, taskid, false, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks.find(obj => obj._id === currentGroupId).completed = data
                return {...updated_value}
            })
        })
    }
    
    function deleteCurrentTask(taskid){
        socket.emit('api-user-task-del', appData.email, currentGroupId, taskid, true, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks.find(obj => obj._id === currentGroupId).current = data
                return {...updated_value}
            })
        })
    }

    function markTaskAsDone(taskid){
        socket.emit('api-user-task-mark', appData.email, currentGroupId, taskid, true, (data, error) => {
            if (error){
                console.log(error)
                return
            }

            setAppData(prev => {
                const updatedValue = {
                  ...prev,
                  tasks: prev.tasks.map(task => {
                    if (task._id === currentGroupId) {
                      return data; 
                    }
                    return task; 
                  })
                };
                return updatedValue;
            });
        }) 
    }

    function markTaskAsNoteDone(taskid){
        socket.emit('api-user-task-mark', appData.email, currentGroupId, taskid, false, (data, error) => {
            if (error){
                console.log(error)
                return
            }
            setAppData(prev => {
                const updatedValue = {
                  ...prev,
                  tasks: prev.tasks.map(task => {
                    if (task._id === currentGroupId) {
                      return data; 
                    }
                    return task; 
                  })
                };
                return updatedValue;
            });
        }) 
    }

    const taskCategoryCreateRef = useRef();
    const taskCategoryDeleteRef = useRef();
    
    return <DataContext.Provider value={{
        appData, 
        setAppData,
        currentGroupId,
        setCurrentGroupId,
        
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
        setSocket,
        setSocketToken,
        setConnectionStatus
    }}>
        {children}
    </DataContext.Provider>
}

const MemoizedDataProvider = React.memo(DataProvider);

export default MemoizedDataProvider;