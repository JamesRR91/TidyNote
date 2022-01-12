import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBook } from '../../store/book';
import './PostBook.css';

export default function PostBook(){
    const [name, setName] = useState("");
    const dispatch= useDispatch();
    // const booksObj = useSelector((state) => state.book.entries);
    // const books = Object.values(booksObj);
    // useEffect(() => {
    //     dispatch(getBooks());
    // }, [dispatch]);
      const reset = () => {
        setName("");
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
          return alert('Your book must have a name.')
        }

        const newBook = {
          book_name: name
        };
        dispatch(createBook(newBook));
        reset();
      };
    return(
        <div className="PostBook">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="New Book"
              name="name"
            />
            <button type="submit">Save</button>
          </form>
        </div>
        );
};
