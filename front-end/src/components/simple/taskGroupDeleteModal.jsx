import {useTaskGroupDeleteModalRef} from "../../hooks/useTaskGroupModalRef";
import { ButtonPrimary, ButtonSecondary } from "./button";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext"
function TaskGroupDeleteModal() {
    const {deleteTaskGroup, currentGroupToBeDeletedId} = useContext(DataContext);
    const refference = useTaskGroupDeleteModalRef();
    return (
        <dialog ref = {refference} className="modal">
            <div className = "modal-container">
                <span className = "modal-container-heading">Task Group</span>
                <hr className="modal-contianer-ruler"/>

                <div className="modal-section">
                    <p className="modal-container-message">
                        Are you sure you want to delete this task group?
                    </p>
                </div>
                <hr className="modal-contianer-ruler"/>

                <div className="modal-section-button">
                    <div>
                        
                    </div>
                    <div style = {{display: "flex"}}>
                        <ButtonPrimary text = 'Done' eventHandler={() => {
                            deleteTaskGroup(currentGroupToBeDeletedId)
                            refference.current.close()
                        }}/>
                        <ButtonSecondary text = "cancel" eventHandler = {() => refference.current.close()}/>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default TaskGroupDeleteModal;