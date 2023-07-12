import { useState } from "react";
import useTaskGroup from "../../hooks/useTaskGroup"
import {CurrentTask, ComletedTask} from "./Task";
import { rgbToHex, hexToRgb, darken } from "../../helper/color";
import TaskInput from "./taskInput";
function TaskTabs() {
  const {currentTaskGroup} = useTaskGroup();
  const color = currentTaskGroup.card.theme;

  const [activeTab, setActiveTab] = useState('current');
  const darkColor = rgbToHex(...darken(hexToRgb(color), 0.4))

  return (
    <>
    <div className = 'tab-container'>
      <div className='tab-nav'>
        <span style = {{backgroundColor : (activeTab === 'current') ? color : darkColor}} onClick = {() => setActiveTab('current')} className={`tab-nav-item`}>current</span>
        <span style = {{backgroundColor : (activeTab === 'completed') ? color : darkColor}} onClick = {() => setActiveTab('completed')} className={`tab-nav-item`}>completed</span>
      </div>
      <div style = {{backgroundColor : color}} className='tab-content'>
        {activeTab === "completed" && currentTaskGroup.completed.map((item, index) => {
          return <ComletedTask key = {item.id} desc = {item.desc} id = {item.id}/>
        })}
        {activeTab === "current" && currentTaskGroup.current.map((item, index) => {
          return <CurrentTask key = {item.id} desc = {item.desc} id = {item.id}/>
        })}
      </div>
    </div>
    {activeTab === 'current' && <TaskInput />}
    </>
  )
}

export default TaskTabs