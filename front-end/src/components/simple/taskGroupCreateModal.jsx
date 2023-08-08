import { useRef, useState } from "react";
import {useTaskGroupCreateModalRef} from "../../hooks/useTaskGroupModalRef";
import { ButtonPrimary, ButtonSecondary } from "./button";
import { hexToRgb } from "../../helper/color";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
export default function TaskGroupCreateModal(){
    const refference = useTaskGroupCreateModalRef();
    const {addTaskGroup} = useContext(DataContext);
    const categoryRef = useRef();
    const colorRef = useRef();
    
    const [error, setError] = useState(false)

    const [rgbValue, setRbgValue] = useState([0,0,0]);
    const [hexValue, setHexValue] = useState('#000000');

    const [category, setCategory] = useState('');
    //enter name for yout task category.
    function RenderNote(){
        return <>
        {error 
        ? <p className="modal-container-error">Note : {error.message}</p> 
        : <p className = "modal-container-note">Note : Color organization simplifies life, saves time, and adds beauty to your surroundings. add color you your task group to make easier to work with.</p>}
        </>
    }    

    function cleanUp(){
        categoryRef.current.value = ""
        colorRef.current.value = "#000000"
        setCategory("")
        setHexValue('#000000')
        setRbgValue([0,0,0])
        setError(false);
        refference.current.close();
    }

    return (
        <dialog ref = {refference} className="modal">
            <div className = "modal-container">
                <span className = "modal-container-heading">Task Group</span>
                <hr className="modal-contianer-ruler"/>

                <div className = 'modal-section'>
                    <label className = "modal-container-label" htmlFor = 'category-name'>category name : {category.length}</label>
                    <input ref = {categoryRef} className = "modal-container-input input-text" type = 'text' id = 'category-name' max={12} placeholder="e.g. Daily Task" onChange={(e) => setCategory(e.target.value)}/>
                    <RenderNote />
                </div>
                
                <div className="modal-section">
                    <label className = "modal-container-label" htmlFor = 'category-color'>choose your color</label>
                    <div style = {{display:"flex"}}>
                        <input ref = {colorRef} onChange = {(e) => {
                            const value = e.target.value;
                            setHexValue(value)
                            setRbgValue(hexToRgb(value))
                            
                        }} className = "modal-container-input input-color" type = 'color' id = 'category-color'/>
                        <div style = {{display:"flex", flexDirection:"column", marginLeft : "1rem", justifyContent : "center"}}>
                            <span className="modal-container-note modal-container-span">{`rgb : (${rgbValue.join(', ')})`}</span>
                            <span className="modal-container-note modal-container-span">{`hex : ${hexValue}`}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-section-button">
                    <div>
                        
                    </div>
                    <div style = {{display: "flex"}}>
                        <ButtonPrimary text = 'Done' eventHandler={() => {
                            if (category === ""){
                                setError(prev => {
                                    return {...prev, message : "enter name for yout task category."}
                                })
                                categoryRef.current.focus();
                                return;
                            }
                            if (category.length >= 12){
                                setError(prev => {
                                    return {...prev, message : "must not exeed limit of 12 character."}
                                })
                                categoryRef.current.focus();
                                return;
                            }
                            addTaskGroup(category, hexValue)
                            cleanUp()
                        }}/>
                        <ButtonSecondary text = "cancel" eventHandler = {() => cleanUp()}/>
                    </div>
                </div>
            </div>
        </dialog>
    )
}