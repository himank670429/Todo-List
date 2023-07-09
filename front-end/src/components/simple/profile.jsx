import { useState } from "react";
import useProfile from "../../hooks/useProfile"
import {Link} from 'react-router-dom';
function Profile({avatar}) {
    const username = useProfile();
    const [shown, setShown] = useState(false);
    return (
    <div className = "dropdown">
        <img className = "avatar" src = {avatar ?? "/avatar/default.png"} onClick={() => setShown(prev => !prev)}/>
        <div className = {`dropdown-content ${(shown) ? 'show' : ""}`}>
            <Link className="dropdown-content-item">{username}</Link>
            <hr />
            <Link className="dropdown-content-item"><i className = "fa-solid fa-arrow-right-from-bracket"/>Logout</Link>
            <span className="dropdown-content-item" onClick={() => setShown(false)}><i className="fa-solid fa-xmark" />close</span>
        </div>
    </div>
    )
}

export default Profile;