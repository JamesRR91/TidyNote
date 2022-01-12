import React , { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import {updateBook} from '../../store/book';
import { useHistory } from 'react-router-dom';
import './EditBook.css'

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
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                />
                <button type="submit" className="submit-button" >Edit</button>
            </form>
        </div>
    )
}
