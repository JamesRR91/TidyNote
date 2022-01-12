import React , { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import {updateNote} from '../../store/note';
import { useHistory } from 'react-router-dom';
import './EditNote.css'

export default function EditNote({id}){

    const dispatch =useDispatch();
    const note=useSelector((state)=>state.note.entries[id])

    const [text,setText]=useState(note.note_text)

    const handleSubmit=(e)=>{
        e.preventDefault();

        const payload={
            ...note,
            note_text: text
        }
        dispatch(updateNote(payload));
    };

    return (
    <div className="InputBox">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            text="text"
            />
            <button type="submit" className="submit-button" >Edit</button>
        </form>
    </div>
    )
}
