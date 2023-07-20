import { ButtonPrimary } from "../simple/button";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from '../simple/profile';
import useTaskGroupModalRef from "../../hooks/useTaskGroupModalRef";
import useTaskGroup from "../../hooks/useTaskGroup";
import useAppData from "../../hooks/useAppData";
function Header() {
    const {data} = useAppData();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {currentTaskGroup} = useTaskGroup()
    const taskGropuCreateRef = useTaskGroupModalRef();

    const isHomeRoute = pathname === '/Home';
    const isTaskRoute = pathname === '/Task';

    const isOtherRoute = pathname !== '/Home' && pathname !== '/Task';

    function homeHeader(){  
        return <>
        <span className="header-item header-item-middle"><b>Home</b></span>
        <div className="header-item header-item-end ">
            <ButtonPrimary 
              icon = {<i className = "fa-solid fa-plus" />} 
              text = "create" 
              eventHandler = {() => {
                  if (taskGropuCreateRef.current){
                      taskGropuCreateRef.current.showModal();
                    }
                }}/>
            <Profile />
        </div>
        </>
    }
    
    function taskHeader(){
        return <>
        <span className="header-item header-item-middle"><b>Task/{currentTaskGroup.card.title}</b></span>
        <div className="header-item header-item-end ">
            <ButtonPrimary 
                text = "back to home page"
                icon = {<i className="fa-solid fa-circle-left"></i>}
                eventHandler={() => {
                    console.log(data)
                    navigate('/Home')
                }}
            />
            <Profile />
        </div></>
    }

    function genralHeader(){
        return <>
        <span className="header-item header-item-middle"><b>{pathname.substring(1)}</b></span>
        <div className="header-item header-item-end">
            <ButtonPrimary 
                text = "back to home page"
                icon = {<i className="fa-solid fa-circle-left"></i>}
                eventHandler={() => {
                    console.log(data)
                    navigate('/Home')
                }}
            />
            <Profile />
        </div>
        </>
    }

    return (
    <div className="header">
        <span className="header-item logo">
            <span data-color = 'black'>dev.himank.</span>
            <span data-color = 'blue'>Todo</span>
        </span>

        {isHomeRoute && homeHeader()}
        {isTaskRoute && taskHeader()}  
        {isOtherRoute && genralHeader()}  
    </div>
    )
}

export default Header;