export function ButtonPrimary({icon, text}){
    return (
        <button className = 'btn btn-primary'>
            {icon}
            {text}
        </button>
    )
}
export function ButtonSecondary({icon, text}){
    return (
        <button className = 'btn btn-secondary'>
            {icon}
            {text}
        </button>
    )
}
