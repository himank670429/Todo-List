import { useState } from "react";
import {CurrentTask, ComletedTask} from "./Task";
import { rgbToHex, hexToRgb, darken } from "../../helper/color";
import TaskInput from "./taskInput";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorBoundary from "../Error/ErrorBoundary";
function TaskTabs() {
  const {currentGroupIndex, appData} = useContext(DataContext);
  const currentTaskGroup = appData.tasks[currentGroupIndex]
  const color = currentTaskGroup.card.theme;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const darkColor = rgbToHex(...darken(hexToRgb(color), 0.4))
  return (
    <ErrorBoundary fallback = {"error"}>
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
    </ErrorBoundary>
  )
}

export default TaskTabs