import React from 'react';
import './style/login.css';
import Eye from './style/eye.svg';
import google from './style/google.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


function Login() {

  const {loginWithRedirect } = useAuth0();


  return (
    <div>
      <form>
        <div className='main_div'>
          <div className='top_text'>
            <div className='signin'><span>Signin</span></div>
            {/* <div className='close_butn'><span>X</span></div> */}
          </div>
          <div className='site-brand site_login'>
            <div className='logo'>
              <h4>TradeX!</h4>
            </div>
          </div>
          <div className="auth-welcome">
            <h2>Hey, Welcome!</h2>
            <p>Please provide your email and password to signin</p>
          </div>
          <div className='signin_form'>
            <input className='signin_input' placeholder='Email ID' />
            <input className='signin_input' placeholder='Password' />
            <img src={Eye} alt='eye' className='sm-eye-icon' />
            <span className='forget-password'>Forgot Password ?</span>
            <button className='login_btn'>Signin</button>
            <div className='bottom_row'>
              Don't have an account ?
              <Link to={'/signup'}>
                <span className='get_started'>Get Started</span>
              </Link>
            </div>
          </div>
          <div className="sm-saperator">
            <span>OR</span>
          </div>
          <div>
            <div className="sm-google-login">
              <img onClick={() => loginWithRedirect()} src={google} style={{ cursor: 'pointer' }} alt='google' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;