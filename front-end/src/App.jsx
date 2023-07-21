import {Routes, Route, useNavigate} from 'react-router-dom';

import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotfoundPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import LoadingPage from './pages/LoadingPage';

import { useRedirect } from './hooks/useRedirect';
import useAppData from './hooks/useAppData';

function App() {
  const {data} = useAppData();
  return (
    <Routes>
      <Route path = '/' element = {<LoadingPage />}/>
      <Route path = '/Home' element = {useRedirect(data, <HomePage />, '/')}/>
      <Route path = '/Task' element = {useRedirect(data, <TaskPage />, '/')}/> 
      <Route path = '/About' element = {useRedirect(data, <AboutUsPage />, '/')}/> 
      <Route path = '/Terms' element = {useRedirect(data, <TermsPage />, '/')} />
      <Route path = '/Privacy' element = {useRedirect(data, <PrivacyPage />, '/')} />
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
  )
}

export default App;