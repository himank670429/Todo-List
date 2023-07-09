import {useContext} from 'react'
import { DataContext } from '../context/DataContext'
export default function useTaskGroupModalRef() {
    const{taskCategoryCreateRef} = useContext(DataContext);
    return taskCategoryCreateRef;
}