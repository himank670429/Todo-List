import {Routes, Route} from 'react-router-dom';

import NotFoundPage from './pages/NotfoundPage';
import LoginPage from './pages/LoginPage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import RequireAuth from './components/Error/RequireAuth';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <GoogleOAuthProvider clientId = {process.env.REACT_APP_CLIENT_ID}>
    <Routes>
      <Route path = '/' element = {<LoadingPage />} />
      <Route path = '/login' element = {<LoginPage />} />
      <Route element = {<RequireAuth />}>
        <Route path = '/Home' element = {<HomePage />}/>
        <Route path = '/Task' element = {<TaskPage />}/> 
        <Route path = '/About' element = {<AboutUsPage />}/> 
      </Route>
      <Route path = '/Terms' element = {<TermsPage />} />
      <Route path = '/Privacy' element = {<PrivacyPage />} />
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;