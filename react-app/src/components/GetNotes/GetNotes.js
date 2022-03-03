import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../../store/note';
import PostNote from '../PostNote/PostNote';
import EditNote from '../EditNote/EditNote'
import DeleteNote from '../DeleteNote/DeleteNote';
import './GetNotes.css';
import SeeTaggedNotes from '../SeeTaggedNotes/SeeTaggedNotes';
import { useParams } from 'react-router-dom';
import { getAllTaggedNotes } from '../../store/taggednote';
import { motion } from 'framer-motion';
import { fadeOut, transition } from '../animations';

export default function GetNotes(){
    const dispatch= useDispatch();
    const { bookId }=useParams();
    const { tagId }=useParams();
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
    if(bookId) {
       filteredNotes=notes.filter(note => note.bookId===+bookId)
    } else if (tagId) {
       filteredTagNotes=taggedNotes.filter(note => note.tagId===+tagId);
       filteredNoteIds=filteredTagNotes.map(note => note.noteId)
       filteredNotes=notes.filter(note => filteredNoteIds.includes(note.id))
    }

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);

    return(
      <motion.div initial="out" animate="in" exit="out" variants={fadeOut} transition={transition}>

            <h3 className="book-title">
                    {books.map(({ id, book_name }) => (
                        <div className='book' key={id}>
                          {id == bookId &&
                            <h2>
                              {book_name}
                            </h2>
                          }
                        </div>
                    ))}
                </h3>



        <div className="get-notes-parent">
            {filteredNotes?.length ? filteredNotes.map(({ id, note_name, note_text}) => (
              <div className='note' key={id}>
                <div className='note-name'>
                  {note_name}
                </div>
                <div>
                  <EditNote id={id} />
                </div>
                  <SeeTaggedNotes id={id}/>
              </div>
            )): <div className='no-note-parent'><h3 className='no-note'>This book / tag has no associated notes.<br></br>Please make one above.</h3></div>}
        </div>
        </motion.div>
    )
}
