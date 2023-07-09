import Card from "../simple/card"
import useAppData from "../../hooks/useAppData"
function Main() {
  const {data} = useAppData();
  return (
    <div className={`main ${(data.tasks.length === 0) ? "empty" : ""}`}>
      {(data.tasks.length === 0) 
      ? <div className="indicator-large" >
          you dont have any task category
        </div>
      : data.tasks.map(({card, current, completed}, index) => <Card 
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