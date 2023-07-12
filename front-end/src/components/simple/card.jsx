function Card({data, eventHandler}) {
  const {card, completed, current} = data;
  const {title, date, theme} = card;
  return (
    <div className='card' style = {{backgroundColor : theme}} onClick = {eventHandler}>
      <span className = "card-info">
        <span className="card-info-title">
          <i className="fa-solid fa-check" />
          {title}
        </span>
        <span className="card-info-date">
          {date}
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