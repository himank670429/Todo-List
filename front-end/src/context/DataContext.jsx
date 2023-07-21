import { useState, useEffect, createContext, useRef } from "react";
export const DataContext = createContext();
import { getUserData } from "../api/apiData";
import useDate from "../hooks/useDate";
export function DataProvider({children}){
    const [appData, setAppData] = useState(null)
    
    useEffect(() => {
        getUserData()
        .then(data => {setAppData(data)})
    }, [])
    
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    
    const [currentGroupToBeDeletedId, setCurrentGroupToBeDeletedId] = useState(null);

    function addTaskGroup(category, hexValue){
        function addZeroes(num){
            return String(num).padStart(2, '0');
        }
        const {day, month, year} = useDate();
        setAppData(prev => {
            const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`
            const newEntry = {
                id : prev.tasks.length ?? 0,
                card : {
                    title : category,
                    date : date_string,
                    theme : hexValue,
                },
                completed : [], 
                current : []
            }

            const updated_value = {...prev}
            updated_value.tasks.push(newEntry)
            return updated_value
        })
    }   

    function deleteTaskGroup(id){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks = updated_value.tasks.filter(item => item.id !== id)
            return updated_value
        })
    }

    function addCurrentTask(desc, date){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current.push({
                _id : crypto.randomUUID(),
                desc,
                date,
            })
            return updated_value
        })
    }

    function deleteCompletedTask(id){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].completed = updated_value.tasks[currentGroupIndex].completed.filter(item => item._id !==id)
            return updated_value
        })
    }

    function deleteCurrentTask(id){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current = updated_value.tasks[currentGroupIndex].current.filter(item => item._id !==id)
            return updated_value
        })
    }

    function markTaskAsDone(id){
        setAppData(prev => {
            const updated_value = {...prev}
            let taskToBeDone;
            updated_value.tasks[currentGroupIndex].current.forEach(item => {
                if (item._id === id)
                    taskToBeDone = item
            });

            if (taskToBeDone === undefined) return prev
            updated_value.tasks[currentGroupIndex].current = updated_value.tasks[currentGroupIndex].current.filter(item => item._id !==id)
            updated_value.tasks[currentGroupIndex].completed.push(taskToBeDone)
            return updated_value
        })
    }

    function markTaskAsNoteDone(id){
        setAppData(prev => {
            const updated_value = {...prev}
            let taskToBeNoteDone;
            updated_value.tasks[currentGroupIndex].completed.forEach(item => {
                if (item._id === id)
                    taskToBeNoteDone = item
            });

            if (taskToBeNoteDone === undefined) return prev
            updated_value.tasks[currentGroupIndex].completed = updated_value.tasks[currentGroupIndex].completed.filter(item => item._id !==id)
            updated_value.tasks[currentGroupIndex].current.push(taskToBeNoteDone)
            return updated_value
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