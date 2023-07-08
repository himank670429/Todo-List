function Card({title, date, current, completed, theme}) {
  return (
    <div className='card' style = {{backgroundColor : theme}}>
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
          <span className="badge-small">{current}</span>
        </span>
        <span>
          completed 
          <span className="badge-small">{completed}</span>
        </span>
      </span>
    </div>
  )
}

export default Card