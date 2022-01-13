import React , { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import { updateTag } from "../../store/tag";
import { useHistory } from 'react-router-dom';
import './EditTag.css'

export default function EditTag({id}){


    const dispatch =useDispatch();
    const tag=useSelector((state)=> state.tag.entries[id])

    const [name,setName]=useState(tag.tag_name);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if (!name) {
            return alert('Your tag must have a name.')
          }

        const payload={
            ...tag,
            tag_name: name
        }

        dispatch(updateTag(payload));
    };

    return(
        <div className="editTagInputBox">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                />
                <button type="submit" className="delete-button" >Edit</button>
            </form>
        </div>
    )
}
