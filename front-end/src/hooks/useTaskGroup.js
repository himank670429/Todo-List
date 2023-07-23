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
        markTaskAsNoteDone,
    } = useContext(DataContext);

    const [currentTaskGroup, setCurrentTaskGroup] = useState(currentGroupIndex !== null ? appData.tasks[currentGroupIndex] : null)
    useEffect(() => {
        setCurrentTaskGroup((prev) => appData.tasks[currentGroupIndex])
    }, [currentGroupIndex,appData.tasks])

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
