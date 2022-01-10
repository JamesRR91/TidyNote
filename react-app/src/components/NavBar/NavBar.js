
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  return (
    <div id="nav-container">
      <nav>
        <ul>
          <li>
            <NavLink className="home-nav" to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="home-nav" to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="home-nav" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          <li>
            <div id="logoutButton">
                <LogoutButton />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
