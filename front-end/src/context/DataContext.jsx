import getDate from "../helper/getDate";
import { getUserData, addTaskGroupfetch, deleteTaskGroupfetch,addTask,deleteTask,markTask} from "../api/apiData";
import { useState, useEffect, createContext, useRef } from "react";
export const DataContext = createContext();

export function DataProvider({children}){
    const [appData, setAppData] = useState(null)
    
    useEffect(() => {
        getUserData()
        .then(data => {console.log(data); setAppData(data)})
    }, [])
    
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year} = getDate();
        const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`

        addTaskGroupfetch(category, hexValue, date_string)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value;
        }))
    }   

    function deleteTaskGroup(){
        deleteTaskGroupfetch(currentGroupToBeDeletedId)
        .then(data => {
            setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = data
            return updated_value
        })})
    }

    function addCurrentTask(desc, date){
        addTask(currentGroupIndex, desc, date)
        .then(data => setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current = data
            return updated_value
        }))
    }

    function deleteCompletedTask(id){
        deleteTask(currentGroupIndex, id, false)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex].completed = data
                return updated_value
            })
        })
    }
    
    function deleteCurrentTask(id){
        deleteTask(currentGroupIndex, id, true)
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
        markTask(currentGroupIndex, id, true)
        .then(data => {
            setAppData(prev => {
                const updated_value = {...prev}
                updated_value.tasks[currentGroupIndex] = data;
                return updated_value
            })
        })  
    }

    function markTaskAsNoteDone(id){
        markTask(currentGroupIndex, id, false)
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
        markTaskAsNoteDone
    }}>
        {children}
    </DataContext.Provider>
}