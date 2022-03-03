import React from 'react';
import './index.css';
import Sidebar from '../Sidebar/Sidebar';
import GetNotes from '../GetNotes/GetNotes';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

export default function Splash() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    return (
      <div>
        <div className='parent'>
          <div className='BoxOne'>
            <h3 className='welcome'>Welcome to TidyNote</h3>
            <h4 className='topOne'>Tame Your Work. Organize Your Life.</h4>
            <h4 className='topTwo'>
              Remember everything and tackle any project with your books, notes, and tags all in one place.
            </h4>
          </div>
          <div className='BoxTwo'>
            <img
              src='https://catpedia.net/wp-content/uploads/2018/01/Chartreux-cat.jpg'
              className='laptopImage'
            ></img>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className='sidebar-parent'>
        <div className='sidebar-div'>
          <Sidebar />
        </div>
        <Footer />
      </div>
    );
  }
}
