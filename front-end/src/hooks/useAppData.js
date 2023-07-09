import { DataContext } from "../context/DataContext";
import { useContext } from "react";
export default function useAppData(){
    const {appData, setAppData} = useContext(DataContext);
    return {data : appData, update : setAppData};
}