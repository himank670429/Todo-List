import { useState, useEffect, createContext, useRef } from "react";

export const DataContext = createContext();

export function DataProvider({children}){
    const [appData, setAppData] = useState({
        username : "username",
        tasks : [
            
        ]
    })

    const taskCategoryCreateRef = useRef();
    return <DataContext.Provider value={{
        appData, 
        setAppData,
        
        taskCategoryCreateRef
    }}>
        {children}
    </DataContext.Provider>
}