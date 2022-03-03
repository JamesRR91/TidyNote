import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTaggedNote, deleteTaggedNote } from '../../store/taggednote';
import './TaggingNotes.css'

export default function TaggingNotes({note_id, tag_id, tag_name, tagged, taggedNote_id}){
    const dispatch= useDispatch();
    const [used, setUsed]=useState(tagged)

   const removeTag=(e) => {
        e.preventDefault();
        const oldTagNote={
            noteId:note_id,
            tagId:tag_id,
            taggedId:taggedNote_id
        }
        dispatch(deleteTaggedNote(oldTagNote));
    }

    const addTag=(e) => {
        e.preventDefault();
        const newTagNote={
            noteId:note_id,
            tagId:tag_id
        }
        dispatch(createTaggedNote(newTagNote));
    }

    return (
        <div id='tagButtondiv'>
        {tagged && <button className='tagBttn' onClick={removeTag}>Untag</button>}
        {!tagged && <button className='tagBttn' onClick={addTag}>Tag</button>}
        </div>
    )
}
