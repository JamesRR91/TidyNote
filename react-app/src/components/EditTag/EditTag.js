import React , { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import { updateTag } from "../../store/tag";
import { useHistory } from 'react-router-dom';
import './EditTag.css'
import { RiSave3Fill } from 'react-icons/ri';

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
        <div className="editBookInputBox">
            <form className="makerow" onSubmit={handleSubmit}>
                <input className="input-bar"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                autocomplete="off"
                autoFocus={true}
                />
                <button type="submit" className="edit-button" ><RiSave3Fill size='25px'/></button>
            </form>
        </div>
    )
}
