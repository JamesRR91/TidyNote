import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import './App.css';
import Splash from './components/Splash'
import Footer from './components/Footer/Footer'
import {AnimatePresence} from 'framer-motion';


function App() {
  const location=useLocation();
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <NavBar loaded={loaded}/>
      <Switch location={location} key={location.pathname}>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/'>
          <Splash />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
      {/* <Footer /> */}
      </>
  );
}

export default App;
