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
        <span style = {{backgroundColor : (activeTab === 'current') ? color : darkColor}} onClick = {() => setActiveTab('current')} className={`tab-nav-item`}>
          <span>current</span>
          {(currentTaskGroup.current.length === 0) ? null : <span className="badge-small">{currentTaskGroup.current.length}</span>}
        </span>
        <span style = {{backgroundColor : (activeTab === 'completed') ? color : darkColor}} onClick = {() => setActiveTab('completed')} className={`tab-nav-item`}>
          <span>completed</span>
          {(currentTaskGroup.completed.length === 0) ? null : <span className="badge-small">{currentTaskGroup.completed.length}</span>}
        </span>
      </div>
      <div style = {{backgroundColor : color}} className='tab-content'>
        {activeTab === "completed" && currentTaskGroup.completed.map((item, index) => {
          return <ComletedTask key = {item._id} desc = {item.desc} id = {item._id}/>
        })}
        {activeTab === "current" && currentTaskGroup.current.map((item, index) => {
          return <CurrentTask key = {item._id} desc = {item.desc} id = {item._id}/>
        })}
      </div>
    </div>
    {activeTab === 'current' && <TaskInput />}
    </>
  )
}

export default TaskTabs