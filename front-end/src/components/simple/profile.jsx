import { useState } from "react";
import useProfile from "../../hooks/useProfile"
import {useNavigate} from 'react-router-dom';
import deleteCookie from '../../helper/deleteCookie';
function Profile() {
    const navigate = useNavigate();
    const {username, avatar} = useProfile();
    const [shown, setShown] = useState(false);
    return (
    <div className = "dropdown">
        <img className = "avatar" src = {avatar ?? "/avatar/default.png"} onClick={() => setShown(prev => !prev)} alt = "avatar"/>
        <div className = {`dropdown-content ${(shown) ? 'show' : ""}`}>
            <span className="dropdown-content-item">{username}</span>
            <hr />
            <span onClick = {() => {
                deleteCookie('access-token')
                navigate('/Login')
            }} className="dropdown-content-item"><i className = "fa-solid fa-arrow-right-from-bracket"/>Logout</span>
            <span className="dropdown-content-item" onClick={() => setShown(false)}><i className="fa-solid fa-xmark" />close</span>
        </div>
    </div>
    )
}

export default Profile;