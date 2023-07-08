import Card from "../simple/card"
import useAppData from "../../hooks/useAppData"
function Main() {
  const {tasks} = useAppData();
  console.log(tasks)
  return (
    <div className="main">
      {tasks.map(({card, current, completed}, index) => <Card 
        key = {index}
        theme = {card.theme}
        title = {card.title}
        date = {card.date}
        current={current.length}
        completed={completed.length}
      />)}
    </div>
  )
}

export default Main