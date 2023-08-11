import {ButtonPrimary} from '../components/simple/button'
import {Link, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import setCookie from '../helper/setCookie';
function LoginPage() {
  const navigate = useNavigate(); 
  const {login, setAppData, setSocketToken} = useContext(DataContext);

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
        
        // update the state to handle connection in data context
        setSocketToken(token)

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
    }
  });

  return (
    <>
      <div className = 'login'>
        <div className="logo">
          <span data-color = 'grey'>dev.himank.</span>
          <span data-color = "blue">todo</span>
        </div>
        <p className="note">
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
        <div className="buttons">
        <ButtonPrimary text = "login" eventHandler={googleLogin}/>
        </div>
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