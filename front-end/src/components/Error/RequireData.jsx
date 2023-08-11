import { Navigate } from "react-router-dom";
function RequireData({data, to, children}) {
    return (
        <>
        {data
            ? children
            : <Navigate to = {to} />
        }
        </>
    )
}

export default RequireData