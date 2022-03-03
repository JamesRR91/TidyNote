import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBook } from '../../store/book';
import './PostBook.css';

export default function PostBook(){
    const [name, setName] = useState("");
    const dispatch= useDispatch();
    const reset = () => {
      setName("");
    };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
          return alert('Your book must have a name.')
        }

        if(name.length > 20) {
          return alert ('Must have less than 20 characters.')
      }

        const newBook = {
          book_name: name
        };
        dispatch(createBook(newBook));
        reset();
      };
    return(
        <div className="PostBook">
          <form className='input-data-postNote' onSubmit={handleSubmit}>
            <input
              id='NewBookInputBox'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="New Book"
              name="name"
              autocomplete="off"
            />
            <button className='submit-button' type="submit">+</button>
          </form>
        </div>
        );
};
