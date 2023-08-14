import {ButtonPrimary} from '../components/simple/button'
import {Link, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { DataContext } from '../context/DataContext';
import { useContext, useState } from 'react';
import setCookie from '../helper/setCookie';
function LoginPage() {
  const navigate = useNavigate(); 
  const {login, setAppData, setConnectionStatus, setSocketToken} = useContext(DataContext);
  const [loadingStatus, setLoadingStatus] = useState('static')
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const {access_token, expires_in} = response;

      // login
      login(access_token)
      .then(({data, token}) => {
        // set the cookies
        setCookie('access-token', access_token, expires_in);
        setCookie('socket-token', token, expires_in);
        
        // set the app data and socket token
        setAppData(data)
        setSocketToken(token)

        // set the connection status 
        setConnectionStatus(prev => ({
          ...prev,
          app_data : true,
          socket_token : true,
        }))
        
        setLoadingStatus('done')
        // navigate to the Home screen
        navigate('/Home')
      })
      .catch(error => {
        // if unauthorized access 
        if (error && error?.response?.status === 401){
          const requestMessage = JSON.parse(error?.request?.response)?.message
          alert(requestMessage)
        }
      })

      // set the state until the app is busy fetching the data
      setLoadingStatus('pending')
    }
  });

  return (
    <>
    <div className = 'login'>
      <div className="logo">
        <span data-color = 'grey'>dev.himank.</span>
        <span data-color = "blue">todo</span>
      </div>
      {
        loadingStatus === 'static' && <><p className="note">
        welcome to dev.himank.todo<br/>
        login with &nbsp; 
        <font color = "#4285F4">G</font>
        <font color = "#EA4335">o</font>
        <font color = '#FBBC05'>o</font>
        <font color = "#4285F4">g</font>
        <font color = '#34A853'>l</font>
        <font color = "#EA4335">e</font>
        &nbsp; to continue.
      </p>
      <div className="button">
      <ButtonPrimary text = "login" eventHandler={googleLogin}/>
      </div></>
      }
      {
        loadingStatus === 'pending' && <>
        <p className = 'note'>fetching your data...</p>
        <p className = 'note note-small'>plz do not reload the web page</p>
        <div className="spinner-container">
        <i className = 'fa-solid fa-spinner spinner'/>
        </div>
        </>
      }
    </div>
    <div className="bottom">
      <Link to = '/Terms'>Terms and condition</Link>
      <span>|</span>
      <Link to = '/Privacy'>Privacy Policy</Link>
    </div>
    </>
  )
}

export default LoginPage