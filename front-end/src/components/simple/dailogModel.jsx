import { useEffect, useRef, useState } from "react";
import useTaskGroupModalRef from "../../hooks/useTaskGroupModalRef";
import { ButtonPrimary, ButtonSecondary } from "./button";
import useAppData from "../../hooks/useAppData";
import { hexToRgb } from "../../helper/color";
import useDate from "../../hooks/useDate";
export function TaskCategoryCreate(){
    const refference = useTaskGroupModalRef();
    const {data, update} = useAppData();
    const categoryRef = useRef();
    const colorRef = useRef();

    const {day, month, year} = useDate();
    
    const [error, setError] = useState(false)

    const [rgbValue, setRbgValue] = useState([0,0,0]);
    const [hexValue, setHexValue] = useState('#000000');

    const [category, setCategory] = useState('');

    function addZeroes(num){
        return String(num).padStart(2, '0');
    }
    // console.log(data)

    function RenderNote(){
        return <>
        {error 
        ? <p className="modal-container-error">Note : enter name for yout task category.</p> 
        : <p className = "modal-container-note">Note : Color organization simplifies life, saves time, and adds beauty to your surroundings. add color you your task group to make easier to work with.</p>}
        </>
    }

    function addTaskCategory(){
        update(prev => {
            const date_string = `${addZeroes(day)}/${addZeroes(month)}/${addZeroes(year)}`
            const newEntry = {
                id : prev.tasks.length ?? 0,
                card : {
                    title : category,
                    date : date_string,
                    theme : hexValue,
                },
                completed : [], 
                current : []
            }

            const updated_value = {...prev}
            updated_value.tasks.push(newEntry)
            return updated_value
        })
    }   

    function cleanUp(){
        categoryRef.current.value = ""
        colorRef.current.value = "#000000"
        setCategory("")
        setHexValue('#000000')
        setRbgValue([0,0,0])
        refference.current.close();
    }

    return (
        <dialog ref = {refference} className="modal">
            <div className = "modal-container">
                <span className = "modal-container-heading">Task Group</span>
                <hr className="modal-contianer-ruler"/>

                <div className = 'modal-section'>
                    <label className = "modal-container-label" htmlFor = 'category-name'>category name</label>
                    <input ref = {categoryRef} className = "modal-container-input input-text" type = 'text' id = 'category-name' placeholder="e.g. Daily Task" onChange={(e) => setCategory(e.target.value)}/>
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
                                setError(true)
                                categoryRef.current.focus();
                                return;
                            }
                            addTaskCategory()
                            cleanUp()
                        }}/>
                        <ButtonSecondary text = "cancel" eventHandler = {() => cleanUp()}/>
                    </div>
                </div>
            </div>
        </dialog>
    )
}