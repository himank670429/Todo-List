import { DataContext } from "../context/DataContext";
import { useContext } from "react";
export default function useAppData(){
    const {appData} = useContext(DataContext);
    return appData;
}