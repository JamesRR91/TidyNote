
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = ({loaded}) => {
  const sessionUser= useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
            <div id="logoutButton">
                <LogoutButton />
            </div>
          </li>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink className="login" to='/login' exact={true} activeClassName='active'>
              Login
          </NavLink>
        </li>
        <li>
            <NavLink className="signup" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
        </li>
      </>
    );
  }
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li>
            <NavLink className="home-nav" to='/' exact={true} activeClassName='active'>
              TidyNote
            </NavLink>
          </li>
          {loaded && sessionLinks}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
