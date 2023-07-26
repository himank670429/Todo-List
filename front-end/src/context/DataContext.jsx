import getDate from "../helper/getDate";
import { login,  addTaskGroupfetch, deleteTaskGroupfetch,addTask,deleteTask,markTask} from "../api/apiData";
import { useState, createContext, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../helper/getCookie";

// context
export const DataContext = createContext();

function DataProvider({children}){
    const navigate = useNavigate();    
    useEffect(() => {
        const access_token = getCookie('access-token');
        console.log(access_token)
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
    }, [])

    const [appData, setAppData] = useState(null)
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year} = getDate();
        const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`

        addTaskGroupfetch(appData._id, category, hexValue, date_string)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value;
        }))
    }   

    function deleteTaskGroup(){
        deleteTaskGroupfetch(appData._id, currentGroupToBeDeletedId)
        .then(data => {
            setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value
        })})
    }

    function addCurrentTask(desc, date){
        addTask(appData._id, currentGroupIndex, desc, date)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current = data
            return updated_value
        }))
    }

    function deleteCompletedTask(id){
        deleteTask(appData._id, currentGroupIndex, id, false)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].completed = data
                return updated_value
            })
        })
    }
    
    function deleteCurrentTask(id){
        deleteTask(appData._id, currentGroupIndex, id, true)
        .then(data => {
            console.log(data)
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].current = data
                return updated_value
            })
        })
    }

    function markTaskAsDone(id){
        markTask(appData._id, currentGroupIndex, id, true)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data;
                return updated_value
            })
        })  
    }

    function markTaskAsNoteDone(id){
        markTask(appData._id, currentGroupIndex, id, false)
        .then(data => {
            console.log(data)
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