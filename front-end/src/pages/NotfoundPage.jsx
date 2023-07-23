import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
function NotfoundPage() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/Home')
        }, 10_000);
    }, [navigate])
    return (
    <div>Notfound</div>
    )
}

export default NotfoundPage