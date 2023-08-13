import { useState } from "react";
import useTaskGroup from '../../hooks/useTaskGroup';
import { rgbToHex, hexToRgb, darken } from "../../helper/color";
import getDate from "../../helper/getDate";
function TaskInput() {
    const {day, month, year} = getDate()
    const {currentTaskGroup, addCurrentTask} = useTaskGroup();
    const color = currentTaskGroup.card.theme;
    const darkColor = rgbToHex(...darken(hexToRgb(color), 0.4))

    const [taskInput, setTaskInput] = useState('')
    const [inputMode, setInputMode] = useState(false);

    function addTask(){

        function addZeroes(num){
            return String(num).padStart(2, '0');
        }

        const dateString = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`
        addCurrentTask(taskInput, dateString)
        setInputMode(false)
    }
    function cancel(){
        setInputMode(false)
        setTaskInput("")
    }

    return (
    <div className='card-inline card-input' style = {{backgroundColor : darkColor}}>
        {(inputMode)
        ? <>
            <i className="fa-regular fa-circle card-input-item"></i>
            <input autoComplete = 'off' autoFocus = {true} type = "text" onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
                if (e.key === "Escape") cancel()
            }} onChange={(e) => setTaskInput(e.target.value)}/>
            <i className ="fa-solid fa-circle-xmark card-input-item" onClick = {() => cancel()}></i>
        </>
        : <>
        <i className="fa-regular fa-circle card-input-item"></i>
        <span className = "card-input-item card-input-label" onClick = {() => setInputMode(true)}>Add Tasks.. </span>
        <i className ="fa-solid fa-circle-plus card-input-item" onClick = {() => setInputMode(true)}></i>
        </>}
    </div>
    )
}

export default TaskInput