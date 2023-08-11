import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function useRedirect (state, defaultMarkup, route){
    const navigate = useNavigate();
    useEffect(() => {   
        if (state === null || state === undefined){
            navigate(route)
        }
    }, [state, navigate, route])
    return (state === null || state === undefined) ? null : defaultMarkup;
}   
