import useTaskGroup from "../../hooks/useTaskGroup";
export function CurrentTask({desc, id}) {
  const {deleteCurrentTask, markTaskAsDone} = useTaskGroup();
  return (
    <div className="card-inline">
      <i className="fa-regular fa-circle" onClick = {() => {
        markTaskAsDone(id)
      }}></i>
      <span className="card-inline-label">{desc}</span>
      <i onClick = {() => deleteCurrentTask(id)} className="fa-solid fa-trash del"></i>
    </div>
  )
}

export function ComletedTask({desc, id}){
  const {deleteCompletedTask, markTaskAsNoteDone} = useTaskGroup();
  return (
    <div className="card-inline" onClick={() => markTaskAsNoteDone(id)}>
      <i className="fa-solid fa-circle-check"></i>
      <span className="card-inline-label card-inline-label-stroke">{desc}</span>
      <i onClick = {() => deleteCompletedTask(id)} className="fa-solid fa-trash del"></i>
    </div>
  )
}