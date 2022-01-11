import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

//   const demoLogin = async () => {
//     const demoUser = { credential: 'Demo-lition', password: 'password' }
//     return dispatch(sessionActions.login(demoUser))
// }

  const handleSubmit = (e) => {
    let err;
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username/Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          autocomplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="button" className='modal-button'>Log In</button>
      <button className='modal-button' onClick={() => {setCredential('Demo-lition'); setPassword('password');}}>Demo Login</button>
    </form>
  );
}

export default LoginForm;
