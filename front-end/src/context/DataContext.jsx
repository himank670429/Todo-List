import getDate from "../helper/getDate";
import { login,  addTaskGroupfetch, deleteTaskGroupfetch,addTask,deleteTask,markTask} from "../api/apiData";
import { useState, createContext, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../helper/getCookie";
import { useLocation } from "react-router-dom";
// context
export const DataContext = createContext();

function DataProvider({children}){
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
    }, [navigate, pathname])
    const [appData, setAppData] = useState(null)
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year} = getDate();
        const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`
        addTaskGroupfetch(appData.email, category, hexValue, date_string)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value;
        }))
    }   

    function deleteTaskGroup(){
        deleteTaskGroupfetch(appData.email, currentGroupToBeDeletedId)
        .then(data => {
            setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value
        })})
    }

    function addCurrentTask(desc, date){
        addTask(appData.email, currentGroupIndex, desc, date)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current = data
            return updated_value
        }))
    }

    function deleteCompletedTask(taskid){
        deleteTask(appData.email, currentGroupIndex, taskid, false)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].completed = data
                return updated_value
            })
        })
    }
    
    function deleteCurrentTask(taskid){
        deleteTask(appData.email, currentGroupIndex, taskid, true)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].current = data
                return updated_value
            })
        })
    }

    function markTaskAsDone(taskid){
        markTask(appData.email, currentGroupIndex, taskid, true)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data;
                return updated_value
            })
        })  
    }

    function markTaskAsNoteDone(taskid){
        markTask(appData.email, currentGroupIndex, taskid, false)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data;
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

    }}>
        {children}
    </DataContext.Provider>
}

const MemoizedDataProvider = React.memo(DataProvider);

export default MemoizedDataProvider;