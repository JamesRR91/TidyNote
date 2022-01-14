import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTaggedNote, deleteTaggedNote } from '../../store/taggednote';

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
        // setUsed(!used)
    }

    const addTag=(e) => {
        e.preventDefault();
        const newTagNote={
            noteId:note_id,
            tagId:tag_id
        }
        dispatch(createTaggedNote(newTagNote));
        // setUsed(!used)
    }

    return (
        <div>
        {tagged && <button onClick={removeTag}>untag</button>}
        {!tagged && <button onClick={addTag}>tag</button>}
        </div>
    )
}
