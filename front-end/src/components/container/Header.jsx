import { ButtonPrimary, ButtonSecondary } from "../simple/button"
function Header() {
  return (
    <div className="header">
        <span className="header-item logo">
            <span data-color = 'black'>dev.himank.</span>
            <span data-color = 'blue'>Todo</span>
        </span>
        <span className="header-item header-item-middle"><b>Home</b></span>
        <div className="header-item header-item-end ">
            <ButtonPrimary icon = {<i className = "fa-solid fa-plus" />} text = "create"/>
            <ButtonSecondary icon = {<i className = "fa-solid fa-arrow-right-from-bracket"/>}text = "logout" />
        </div>
    </div>
  )
}

export default Header