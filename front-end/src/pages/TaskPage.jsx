import Header from "../components/container/Header";
import Main from "../components/container/Main";
import useTaskGroup from "../hooks/useTaskGroup";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import {useRedirect} from '../hooks/useRedirect';
import { Navigate } from "react-router-dom";

function TaskPage() {
    const {currentTaskGroup} = useTaskGroup();
    return useRedirect(currentTaskGroup, <ErrorBoundary fallback = {<Navigate to = '/Home'/>}>
        <Header />
        <Main />
    </ErrorBoundary>, '/Home')
}

export default TaskPage;