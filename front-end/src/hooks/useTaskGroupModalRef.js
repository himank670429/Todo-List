import {useContext} from 'react'
import { DataContext } from '../context/DataContext'
export function useTaskGroupCreateModalRef() {
    const{taskCategoryCreateRef} = useContext(DataContext);
    return taskCategoryCreateRef;
}
export function useTaskGroupDeleteModalRef(){
    const {taskCategoryDeleteRef} = useContext(DataContext);
    return taskCategoryDeleteRef;
}