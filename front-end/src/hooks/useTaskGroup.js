import { DataContext } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
function useTaskGroup() {
    const { 
        appData, 
        currentGroupId, 
        setCurrentGroupId, 
        addCurrentTask, 
        deleteCurrentTask, 
        deleteCompletedTask, 
        markTaskAsDone,
        markTaskAsNoteDone,
    } = useContext(DataContext);


    const [currentTaskGroup, setCurrentTaskGroup] = useState(currentGroupId !== null ? appData.tasks.find(obj => obj._id === currentGroupId) : null)
    useEffect(() => {
        setCurrentTaskGroup((prev) => {
            return appData.tasks.find(obj => obj._id === currentGroupId
        )})
    }, [currentGroupId, appData.tasks])

    return { 
        currentTaskGroup, 
        setCurrentGroupId, 
        addCurrentTask, 
        deleteCurrentTask, 
        deleteCompletedTask, 
        markTaskAsDone,
        markTaskAsNoteDone
    };
}

export default useTaskGroup;
