import { useState } from "react";
import {CurrentTask, ComletedTask} from "./Task";
import { rgbToHex, hexToRgb, darken } from "../../helper/color";
import TaskInput from "./taskInput";
import { DataContext } from "../../context/DataContext";
import { useContext} from "react";
function TaskTabs() {
  const {currentGroupIndex, appData} = useContext(DataContext);
  const [activeTab, setActiveTab] = useState('current');

  const currentTaskGroup = appData.tasks[currentGroupIndex]
  if (!currentTaskGroup) { // when the current taskGroup we get deleted by another instance
    return <></>;
  }
  const color = currentTaskGroup.card.theme;
  const darkColor = rgbToHex(...darken(hexToRgb(color), 0.4))

  function currentTabContent(array){
    if (array.length === 0){
      return <span style = {{fontSize : '20px'}}>No current Tasks</span>
    }
    return array.map((item, index) => {
      return <CurrentTask key = {item._id} desc = {item.desc} id = {item._id}/>
    })
  }
  function completedTabContent(array){
    if (array.length === 0){
      return <span style = {{fontSize : '20px'}} >No completed Tasks</span>
    }
    return array.map((item, index) => {
      return <ComletedTask key = {item._id} desc = {item.desc} id = {item._id}/>
    })
  }

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
          {activeTab === "completed" && completedTabContent(currentTaskGroup.completed)}
          {activeTab === "current" && currentTabContent(currentTaskGroup.current)}
        </div>
      </div>
      {activeTab === 'current' && <TaskInput />}
    </>
  )
}

export default TaskTabs