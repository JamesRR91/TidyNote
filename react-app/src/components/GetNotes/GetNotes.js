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
    return(
        <div className="get-notes-parent">
            {filteredNotes?.length ? filteredNotes.map(({ id, note_name, note_text}) => (
              <div className='note' key={id}>
                <div className='note-name'>
                  {note_name}
                </div>
                <div>
                  <EditNote id={id} />
                  {/* <DeleteNote id={id} /> */}
                </div>
                  <SeeTaggedNotes id={id}/>
              </div>
            )): <div className='no-note-parent'><h3 className='no-note'>This book / tag has no associated notes.<br></br>Please make one above.</h3></div>}
        </div>
    )
}
