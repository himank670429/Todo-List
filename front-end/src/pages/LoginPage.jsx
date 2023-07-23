import {ButtonPrimary} from '../components/simple/button'
import {Link, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from '../api/apiData';
import useAppData from '../hooks/useAppData';
function LoginPage() {
  const {update} = useAppData();
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async response => {
      const data = await login(response.access_token)
      update(data)
      navigate('/Home')
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
        <span>
          |
        </span>
        <Link to = '/Privacy'>Privacy Policy</Link>
      </div>
    </>
  )
}

export default LoginPage