import { ButtonPrimary, ButtonSecondary } from "../simple/button";
import Profile from "../simple/profile";
import useTaskGroupModalRef from "../../hooks/useTaskGroupModalRef";
function Header() {
  const taskGropuCreateRef = useTaskGroupModalRef()
  return (
    <div className="header">
        <span className="header-item logo">
            <span data-color = 'black'>dev.himank.</span>
            <span data-color = 'blue'>Todo</span>
        </span>
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
    </div>
  )
}

export default Header