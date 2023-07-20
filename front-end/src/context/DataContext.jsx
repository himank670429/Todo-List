import { useState, useEffect, createContext, useRef } from "react";
export const DataContext = createContext();

export function DataProvider({children}){
    const [appData, setAppData] = useState({
        username : "username",
        avatar : null,
        tasks : [
            {   
                id : 0,
                card : {
                    title : "Day",
                    date : "10/07/2023",
                    theme : "#0f6dd2"
                },
                current : [
                    {
                        id : "6b8f1e1f-f852-4add-99e1-3b43a1fe9ba8",
                        desc : "Task 1",
                        date : "10/07/2023",
                    },
                    {
                        id : "3c8835b3-5a13-4fa0-a357-3eaf3e3dd19f",
                        desc : "Task 2",
                        date : "10/07/2023",
                    }
                ],
                completed : [
                    {
                        id : "1035fc05-d3e8-4ca1-8350-2e8c5f5288a4",
                        desc : "Task 3",
                        date : "10/07/2023",
                    },
                    {
                        id : "0247b29e-dae0-4ebf-adb7-758326bd6683",
                        desc : "Task 4",
                        date : "10/07/2023",
                    }
                ]
            }
        ]
    })

    
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
    
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
                id : crypto.randomUUID(),
                desc,
                date,
            })
            return updated_value
        })
    }

    function deleteCompletedTask(id){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].completed = updated_value.tasks[currentGroupIndex].completed.filter(item => item.id !==id)
            return updated_value
        })
    }

    function deleteCurrentTask(id){
        setAppData(prev => {
            const updated_value = {...prev}
            updated_value.tasks[currentGroupIndex].current = updated_value.tasks[currentGroupIndex].current.filter(item => item.id !==id)
            return updated_value
        })
    }

    function markTaskAsDone(id){
        setAppData(prev => {
            const updated_value = {...prev}
            let taskToBeDone;
            updated_value.tasks[currentGroupIndex].current.forEach(item => {
                if (item.id === id)
                    taskToBeDone = item
            });

            if (taskToBeDone === undefined) return prev
            updated_value.tasks[currentGroupIndex].current = updated_value.tasks[currentGroupIndex].current.filter(item => item.id !==id)
            updated_value.tasks[currentGroupIndex].completed.push(taskToBeDone)
            return updated_value
        })
    }

    function markTaskAsNoteDone(id){
        setAppData(prev => {
            const updated_value = {...prev}
            let taskToBeNoteDone;
            updated_value.tasks[currentGroupIndex].completed.forEach(item => {
                if (item.id === id)
                    taskToBeNoteDone = item
            });

            if (taskToBeNoteDone === undefined) return prev
            updated_value.tasks[currentGroupIndex].completed = updated_value.tasks[currentGroupIndex].completed.filter(item => item.id !==id)
            updated_value.tasks[currentGroupIndex].current.push(taskToBeNoteDone)
            return updated_value
        })
    }

    const taskCategoryCreateRef = useRef();
    return <DataContext.Provider value={{
        appData, 
        setAppData,
        currentGroupIndex,
        setCurrentGroupIndex,
        taskCategoryCreateRef,

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