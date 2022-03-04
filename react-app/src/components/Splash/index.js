import React from 'react';
import './index.css';
import Sidebar from '../Sidebar/Sidebar';
import GetNotes from '../GetNotes/GetNotes';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import tidyNoteLaptop from './tidyNoteLaptop.png'

export default function Splash() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    return (
      <div>
        <div className='parent'>
          <div className='BoxOne'>
            <h3 className='welcome'>Welcome to TidyNote.</h3>
            <h4 className='topOne'>Tame Your Work. Organize Your Life.</h4>
            <h4 className='topTwo'>
              Remember everything and tackle any project with your books, notes, and tags all in one place.
            </h4>
          </div>
          <div className='BoxTwo'>
            <img
              src={tidyNoteLaptop}
              className='laptopImage'
            ></img>
              <div className='BoxTwoQuotes'>
                <h4 className='sideQuoteHeader'>
                  WORK ANYWHERE
                </h4>
                <p className='sideQuoteParagraph'>
                Keep important info handy—your notes be saved online.
                </p>
                <h4 className='sideQuoteHeader'>
                REMEMBER EVERYTHING
                </h4>
                <p className='sideQuoteParagraph'>
                Make notes more useful by formatting your text.
                </p>
                <h4 className='sideQuoteHeader'>
                GET IT DONE
                </h4>
                <p className='sideQuoteParagraph'>
                Bring your books, notes, and tags together to get things done more easily.
                </p>
                <h4 className='sideQuoteHeader'>
                FIND THINGS FAST
                </h4>
                <p className='sideQuoteParagraph'>
                Get what you need, when you need it with our powerful book and tag filters.
                </p>
              </div>
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
