import Card from "../simple/card"
import useAppData from "../../hooks/useAppData"
import {useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import TaskTabs from "../simple/TaskTabs";
import useTaskGroup from "../../hooks/useTaskGroup";
function Main() {
  const {data} = useAppData();
  const {setCurrentGroupIndex} = useTaskGroup();
  
  const {pathname} = useLocation();
  const isHomeRoute = pathname === '/Home'
  const isTaskRoute = pathname === '/Task'

  const navigate = useNavigate();

  function homeMain(){
    return (
    <div className={`main wrapper-flex ${(data.tasks.length === 0) ? "empty" : ""}`}>
      {(data.tasks.length === 0) 
      ? <div className="indicator-large" >
          you dont have any task category
        </div>
      : data.tasks.map((item, index) => <Card 
          key = {index} 
          data = {item} 
          handleTaskPage = {() => {
            setCurrentGroupIndex(index)
            navigate('/Task')
          }}
        />)}
    </div>
    )
  }

  function taskMain(){
    return (
      <div className = 'main'>
        <TaskTabs />
      </div>
    )
  }

  return (<>
    {isHomeRoute && homeMain()}
    {isTaskRoute && taskMain()}
  </>)
}

export default Main