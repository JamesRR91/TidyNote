import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton.js'
import "./NavBar.css"

const NavBar = ({loaded}) => {
  const sessionUser= useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
            <div id="profileButton">
                <ProfileButton user={sessionUser}/>
            </div>
          </li>
    );
  } else {
    sessionLinks = (
      <>
         <div className="nav-container-forsignup">
            <div className='login-button'>
              <NavLink className="login" to='/login' exact={true} activeClassName='active'>
                  Log In / Demo
              </NavLink>
            </div>
            <div className='login-button'>
                <NavLink className="signup" to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
            </div>
         </div>
      </>
    );
  }
  return (
    <div className="nav-container">
      <div className="allThree">
            <NavLink className="home-nav" to='/' exact={true} activeClassName='active'>
              TidyNote
            </NavLink>
            {loaded && sessionLinks}
      </div>
    </div>
  );
}

export default NavBar;
