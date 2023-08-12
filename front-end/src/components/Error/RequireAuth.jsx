import getCookie from "../../helper/getCookie";
import { Navigate, Outlet } from "react-router-dom";
function RequireAuth() {
    const access_token = getCookie('access-token');
    const socket_token = getCookie('socket-token');
    return (
        <>
        {access_token && socket_token
            ? <Outlet />
            : <Navigate to = '/Login' />
        }
        </>
    )
}

export default RequireAuth