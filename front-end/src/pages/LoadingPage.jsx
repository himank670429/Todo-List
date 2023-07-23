import { useEffect } from "react"
import useAppData from "../hooks/useAppData"
import { useNavigate } from "react-router-dom"
function LoadingPage() {
    const navigate = useNavigate();
    const {data} = useAppData();
    useEffect(() => {
        if (data){
            console.log(data)
            navigate('/login')
        }
    }, [data, navigate])
    return (
        <div>loading.....</div>
    )
}

export default LoadingPage