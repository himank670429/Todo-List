import {ButtonPrimary} from '../components/simple/button'
import {Link, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import setCookie from '../helper/setCookie';
function LoginPage() {
  const navigate = useNavigate(); 
  const {login, setAppData} = useContext(DataContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const {access_token, expires_in} = response;
      login(access_token)
      .then(data => {
        setAppData(data)
        setCookie('access-token', access_token, expires_in)
        navigate('/Home')
      })
    }
  });

  return (
    <>
      <div className = 'login'>
        <div className="logo">
          <span>dev.himank.</span>
          <span data-color = "blue">todo</span>
        </div>
        <p className="note">
          welcome to dev.himank.todo<br/>
          login or singup to continue with&nbsp; 
          <font color = "#4285F4">G</font>
          <font color = "#EA4335">o</font>
          <font color = '#FBBC05'>o</font>
          <font color = "#4285F4">g</font>
          <font color = '#34A853'>l</font>
          <font color = "#EA4335">e</font>
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