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
                <h4 className='sideQuoteParagraph'>
                Keep important info handy—your notes be saved online.
                </h4>
                <h4 className='sideQuoteHeader'>
                REMEMBER EVERYTHING
                </h4>
                <h4 className='sideQuoteParagraph'>
                Make notes more useful by adding text, images, audio, scans, PDFs, and documents.
                </h4>
                <h4 className='sideQuoteHeader'>
                TURN TO-DO INTO DONE
                </h4>
                <h4 className='sideQuoteParagraph'>
                Bring your notes, tasks, and schedules together to get things done more easily.
                </h4>
                <h4 className='sideQuoteHeader'>
                FIND THINGS FAST
                </h4>
                <h4 className='sideQuoteParagraph'>
                Get what you need, when you need it with powerful, flexible search capabilities.
                </h4>
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
