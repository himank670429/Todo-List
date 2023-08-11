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

    function getTask(id){
        // console.log(appData.tasks.find(obj => obj._id === id))
        return appData.tasks.find(obj => obj._id === id)
    }

    const [currentTaskGroup, setCurrentTaskGroup] = useState(currentGroupId !== null ? getTask(currentGroupId) : null)
    useEffect(() => {
        setCurrentTaskGroup((prev) => getTask(currentGroupId))
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
