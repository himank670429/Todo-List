import {Routes, Route} from 'react-router-dom';

import NotFoundPage from './pages/NotfoundPage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import useAppData from './hooks/useAppData';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { useRedirect } from './hooks/useRedirect';

function App() {
  const {data} = useAppData();
  return (
    <GoogleOAuthProvider clientId = {process.env.REACT_APP_CLIENT_ID}>
    <Routes>
      <Route path = '/' element = {<LoadingPage />}/>
      <Route path = '/login' element = {<LoginPage />}>
        <Route path = ':id'/>
      </Route>
      <Route path = '/Home' element = {useRedirect(data, <HomePage />, '/')}/>
      <Route path = '/Task' element = {useRedirect(data, <TaskPage />, '/')}/> 
      <Route path = '/About' element = {useRedirect(data, <AboutUsPage />, '/')}/> 
      <Route path = '/Terms' element = {useRedirect(data, <TermsPage />, '/')} />
      <Route path = '/Privacy' element = {useRedirect(data, <PrivacyPage />, '/')} />
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;