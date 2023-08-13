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
import RequireData from './components/Error/RequireData';
import useAppData from './hooks/useAppData';
function App() {
  const {data} = useAppData();
  return (
    <GoogleOAuthProvider clientId = {process.env.REACT_APP_CLIENT_ID}>
    <Routes>
      <Route path = '/' element = {<LoadingPage />} />
      <Route path = '/Login' element = {<LoginPage />} />
      <Route element = {<RequireAuth />}>
        <Route path = '/Home' element = {<RequireData data = {data} to = '/'><HomePage /></RequireData>}/>
        <Route path = '/Task' element = {<RequireData data = {data} to = '/'><TaskPage /></RequireData>}/> 
        <Route path = '/About' element = {<RequireData data = {data} to = '/'><AboutUsPage /></RequireData>}/> 
      </Route>
      <Route path = '/Terms' element = {<TermsPage />} />
      <Route path = '/Privacy' element = {<PrivacyPage />} />
      <Route path = '*' element = {<NotFoundPage />} />
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;