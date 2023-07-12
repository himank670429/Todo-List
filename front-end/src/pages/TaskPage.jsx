import Header from "../components/container/Header";
import Main from "../components/container/Main";
import Footer from '../components/container/Footer';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useTaskGroup from "../hooks/useTaskGroup";
function TaskPage() {
    const navigate = useNavigate();
    const {currentTaskGroup} = useTaskGroup();
    useEffect(() => {
        currentTaskGroup ?? navigate('/Home')
    }, [currentTaskGroup, navigate])
    return <>
        {(currentTaskGroup === null) 
        ? null 
        : <>
            <Header />
            <Main />
            <Footer />
        </>}
    </>
}

export default TaskPage;