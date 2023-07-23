import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

import { useTaskGroupDeleteModalRef } from "../../hooks/useTaskGroupModalRef";

function Card({data, handleTaskPage}) {
  const {card, completed, current, _id} = data;
  const {title, date, theme} = card;

  const taskCategoryDeleteRef = useTaskGroupDeleteModalRef()
  const {setCurrentGroupToBeDeletedId} = useContext(DataContext);
  return (
    <div className='card' style = {{backgroundColor : theme}}>
      <span className = 'card-upper'>
        <span className = "card-info" onClick = {handleTaskPage}>
          <span className="card-info-title">
            <i className="fa-solid fa-check" />
            {title}
          </span>
          <span className="card-info-date">
            {date}
          </span>
        </span>
        <span className = "card-options">
          <i className = 'fa-solid fa-trash' onClick = {() => {
            setCurrentGroupToBeDeletedId(_id);
            taskCategoryDeleteRef.current.showModal()
          }}/>
        </span>
      </span>
      <span className = "card-task-info">
        <span>
          current 
          <span className="badge-small">{current.length}</span>
        </span>
        <span>
          completed 
          <span className="badge-small">{completed.length}</span>
        </span>
      </span>
    </div>
  )
}

export default Card