import {Routes, Route, useNavigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotfoundPage';
import { useEffect } from 'react';

function DefaultRedirect(){
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/Home');
  }, [navigate])
  return <></>
}

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<DefaultRedirect />}/>
      <Route path = '/Home' element = {<HomePage />}/>
      <Route path = '/Task' element = {<TaskPage />}/> 
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
  )
}

export default App