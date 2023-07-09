export function ButtonPrimary({icon, text, eventHandler}){
    return (
        <button 
        className = 'btn btn-primary'
        onClick = {eventHandler}>
            {icon}
            {text}
        </button>
    )
}
export function ButtonSecondary({icon, text, eventHandler}){
    return (
        <button 
        className = 'btn btn-secondary'
        onClick = {eventHandler}>
            {icon}
            {text}
        </button>
    )
}
