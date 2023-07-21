import Header from "../components/container/Header";
import Main from "../components/container/Main";
import Footer from '../components/container/Footer';
import useTaskGroup from "../hooks/useTaskGroup";

import {useRedirect} from '../hooks/useRedirect';

function TaskPage() {
    const {currentTaskGroup} = useTaskGroup();
    return useRedirect(currentTaskGroup, <>
        <Header />
        <Main />
        <Footer />
    </>, '/Home')
}

export default TaskPage;