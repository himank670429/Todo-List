import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotfoundPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

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
      <Route path = '/About' element = {<AboutUsPage />}/> 
      <Route path = '/Terms' element = {<TermsPage />} />
      <Route path = '/Privacy' element = {<PrivacyPage />} />
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
  )
}

export default App