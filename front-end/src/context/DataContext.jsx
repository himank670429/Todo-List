import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

export function DataProvider({children}){
    const [appData, setAppData] = useState({
        username : "username",
        tasks : [
            {
                card : {
                    title : "Day",
                    date : "06-07-2023",
                    theme : "#0277FF",
                }, 
                completed : [], 
                current : []
            },
            {
                card : {
                    title : "Week",
                    date : "06-07-2023",
                    theme : "#D56600",
                }, 
                completed : [], 
                current : []
            },
            {
                card : {
                    title : "Important",
                    date : "06-07-2023",
                    theme : "#249336",
                }, 
                completed : [], 
                current : []
            },
            {
                card : {
                    title : "Study",
                    date : "06-07-2023",
                    theme : "#2DCAD0",
                }, 
                completed : [], 
                current : []
            },
            {
                card : {
                    title : "Workout",
                    date : "06-07-2023",
                    theme : "#840DA0",
                }, 
                completed : [], 
                current : []
            }
        ]
    })
    return <DataContext.Provider value={{appData, setAppData}}>
        {children}
    </DataContext.Provider>
}