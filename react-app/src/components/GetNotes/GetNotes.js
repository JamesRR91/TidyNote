import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../../store/note';
import PostNote from '../PostNote/PostNote';
import EditNote from '../EditNote/EditNote';
import NoteModal from "../NoteModal/index";
import DeleteNote from '../DeleteNote/DeleteNote';
// import './GetNotes.css';
import './GetNotes2.css'
import SeeTaggedNotes from '../SeeTaggedNotes/SeeTaggedNotes';
import { useParams } from 'react-router-dom';
import { getAllTaggedNotes } from '../../store/taggednote';
import { motion } from 'framer-motion';
import { fadeOut, transition } from '../animations';
import { FaBook, FaTag } from 'react-icons/fa';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

export default function GetNotes() {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const { tagId } = useParams();
  useEffect(() => {
    dispatch(getAllTaggedNotes());
  }, [dispatch]);
  const notesObj = useSelector((state) => state.note.entries);
  const notes = Object.values(notesObj);
  const taggedObj = useSelector((state) => state.tagged.entries);
  const taggedNotes = Object.values(taggedObj);
  let filteredNotes;
  let filteredTagNotes;
  let filteredNoteIds;
  if (bookId) {
    filteredNotes = notes.filter((note) => note.bookId === +bookId);
  } else if (tagId) {
    filteredTagNotes = taggedNotes.filter((note) => note.tagId === +tagId);
    filteredNoteIds = filteredTagNotes.map((note) => note.noteId);
    filteredNotes = notes.filter((note) => filteredNoteIds.includes(note.id));
  }

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  const [openNoteId, setOpenNoteId]=useState(null);
  const handleClick= (id) => {
    if (openNoteId===id) {
      setOpenNoteId(null)
    } else {
      setOpenNoteId(id)
    }
  }

  const booksObj = useSelector((state) => state.book.entries);
  const books = Object.values(booksObj);
  const tagsObj = useSelector((state) => state.tag.entries);
  const tags = Object.values(tagsObj);

  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={fadeOut}
      transition={transition}
    >
    <NoteModal />
    <div className='bookName_and_icon_big'>
      <h3 className='book-title'>
        {books.map(({ id, book_name }) => (
          <div className='bookTitle' key={id}>
            {id == bookId && <h2 className='bookAndLogo'><FaBook id='book-logo' color='rgb(15, 89, 119)' />{book_name}</h2>}
          </div>
        ))}
      </h3>
    </div>
    <div className='bookName_and_icon_big'>
      <h3 className='book-title'>
        {tags.map(({ id, tag_name }) => (
          <div className='bookTitle' key={id}>
            {id == tagId && <h2 className='bookAndLogo'><FaTag id='book-logo' color='rgb(15, 89, 119)' />{tag_name}</h2>}
          </div>
        ))}
      </h3>
    </div>
      <div className='get-notes-parent'>
        {filteredNotes?.length ? (
          filteredNotes.map(({ id, note_name }) => (
            <div className='note' key={id}>
              <button className='edit-note-button' onClick={()=>handleClick(id)}>{note_name}</button>
              <div>
                      {
                        openNoteId===id?<EditNote id = {id}/>:null
                      }
                      {
                        openNoteId===id?<SeeTaggedNotes id = {id}/>:null
                      }
                    </div>
              {/* <div className='note-name'>{note_name}</div> */}
              {/* <div>
                <EditNote id={id} />
              </div>
              <SeeTaggedNotes id={id} /> */}
            </div>
          ))
        ) : (
          <div className='no-note-parent'>
            <h3 className='no-note'>
              This book / tag has no associated notes.<br></br>Please make one
              above.
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}
