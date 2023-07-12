import { DataContext } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
function useTaskGroup() {
    const { 
        appData, 
        currentGroupIndex, 
        setCurrentGroupIndex, 
        addCurrentTask, 
        deleteCurrentTask, 
        deleteCompletedTask, 
        markTaskAsDone,
        markTaskAsNoteDone
    } = useContext(DataContext);

    const data =  appData.tasks[currentGroupIndex]
    const [currentTaskGroup, setCurrentTaskGroup] = useState((currentGroupIndex === null) ? null : data)

    useEffect(() => {
        setCurrentTaskGroup((prev) => appData.tasks[currentGroupIndex])
    }, [currentGroupIndex])

    return { 
        currentTaskGroup, 
        setCurrentGroupIndex, 
        addCurrentTask, 
        deleteCurrentTask, 
        deleteCompletedTask, 
        markTaskAsDone,
        markTaskAsNoteDone
    };
}

export default useTaskGroup;
