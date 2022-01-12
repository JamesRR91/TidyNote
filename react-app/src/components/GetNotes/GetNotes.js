import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../../store/note';
import PostNote from '../PostNote/PostNote';
import DeleteNote from '../DeleteNote/DeleteNote';
import './GetNotes.css';

export default function GetNotes(){
    const dispatch= useDispatch();
    const notesObj = useSelector((state) => state.note.entries);
    const notes = Object.values(notesObj);
    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);
    return(
        <div className="get-notes-parent">
          <ul>
            {notes.map(({ id, note_name, note_text}) => (
              <li key={id}>
                {note_name}
                {note_text}
                <DeleteNote id={id} />
              </li>
            ))}
          </ul>
          <PostNote />
        </div>
    )
}
