import React , { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import {updateBook} from '../../store/book';
import { useHistory } from 'react-router-dom';
import './EditBook.css'
import { RiSave3Fill } from 'react-icons/ri'

export default function EditBook({id}){


    const dispatch =useDispatch();
    const book=useSelector((state)=> state.book.entries[id])

    const [name,setName]=useState(book.book_name);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if (!name) {
            return alert('Your book must have a name.')
          }

        const payload={
            ...book,
            book_name: name
        }

        dispatch(updateBook(payload));
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
