import React from 'react';
import './style/navbar.css';
import { NavLink as Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Img from './style/logo.png';

function Navbar() {

  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <div>
      <div className='navbar'>
        <div className='nav-left'>
          <div className='site-brand'>
            <div className='logo'>
              <Link to={'/'}>
                <img src={Img} alt='img'/>
              </Link>
            </div>
          </div>
        </div>
        <div className='nav-right'>
          <div className='right-menu'>
            {isAuthenticated ?
              <div className='logout'>
                {isAuthenticated && <div><span><img src={user.picture} className='userImg' alt='user' /></span></div>}
                {isAuthenticated && <div><span>{user.name}</span></div>}
                <span onClick={() => logout()} className='btn'>Logout</span>
              </div>
              :
              <>
                <Link to={'/'}>
                  <span className='btn'>Home</span>
                </Link>
                <span className='btn' onClick={() => loginWithRedirect()}>Login</span>
                {/* <Link to={'/login'}>
                </Link> */}
                <span className='btn' onClick={() => loginWithRedirect()}>Signup</span>
                {/* <Link to={'/signup'}>
                </Link> */}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;