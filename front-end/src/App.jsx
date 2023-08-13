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
    https://dev-himank-todo.onrender.com/
    </GoogleOAuthProvider>
  )
}

export default App;