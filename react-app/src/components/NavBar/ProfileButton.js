import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    const logout = (e) => {
        e.preventDefault();
        history.push('/');
        dispatch(sessionActions.logout());
    }
    return (
        <div className='center-profile'>
          <div className='welcome-message'>{`Welcome, ${user.username}!`}</div>
          {/* <button onClick={openMenu}>
            <i className="fas fa-user"></i>
          </button> */}
          <li>
            <button className='logout-button'onClick={logout}>Log Out</button>
          </li>
          {/* {showMenu && (
            <ul className="profile-dropdown">
              <li className='profile-list-item'>Username:{user.username}</li>
              <li className='profile-list-item'>Email:{user.email}</li>
              <li>
                <button className='logout-button'onClick={logout}>Log Out</button>
              </li>
            </ul>
          )} */}
        </div>
      );
}
export default ProfileButton
