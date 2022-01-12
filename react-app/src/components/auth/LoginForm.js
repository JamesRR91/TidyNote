import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect,Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form  className='user-form' onSubmit={onLogin}>
        <h2 className="form-title"> Log In</h2>
        <ul className='user-form-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </ul>
        <div className='sign-in-form'>
          <div className='form-inputs'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-inputs'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </div>
        <div className="sub-cancel-buttons">
          <button className='aa' type='submit'>
            Login
          </button>
          <button className="aa"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            Demo User
          </button>
        </div>
        <div className="sub-cancel-buttons">
          <span className="cancel-button">
            <Link className="redirect-link" to="/">
              Cancel
            </Link>
          </span>
        </div>
      </form>
    </div>

  );
};

export default LoginForm;
