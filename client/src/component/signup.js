import React, { useState } from 'react';
import './style/signup.css';
import google from './style/google.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Signup() {
  const [signup, setSignup] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    pass: ''
  })

  const {loginWithRedirect } = useAuth0();

  const signupData = (e) => {
    const { name, value } = e.target;
    setSignup((newData) => {
      return {
        ...newData, [name]: value
      }
    })
  }

  const sendData = (e) => {
    e.preventDefault();
    console.log(signup);
    localStorage.setItem('userData', JSON.stringify(signup));
  }


  return (
    <div>
      <form onSubmit={sendData}>
        <div className='signup_main_div'>
          <div className='top_text'>
            <div className='signin'><span>Signup</span></div>
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
            <input value={signup.fname} name='fname' type="text" onChange={signupData} className='signin_input' placeholder='First Name' />
            <input value={signup.lname} name='lname' type="text" onChange={signupData} className='signin_input' placeholder='Last Name' />
            <input value={signup.email} name='email' type="text" onChange={signupData} className='signin_input' placeholder='Email Address' />
            <input value={signup.phone} name='phone' type="number" onChange={signupData} className='signin_input' placeholder='Phone (Optional)' />
            <input value={signup.pass} name='pass' type="text" onChange={signupData} className='signin_input' placeholder='Password' />
            <button onSubmit={sendData} className='signup_btn'>Create Account</button>
            <div className='bottom_row'>
              Already have an account ?
              <Link to={'/login'}>
                <span className='get_started'>Signin Now</span>
              </Link>
            </div>
          </div>
          <div className="sm-saperator">
            <span>OR</span>
          </div>
          <div>
            <div className="sm-google-login">
              <img onClick={() => loginWithRedirect()} src={google} style={{cursor:'pointer'}} alt='google' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup;