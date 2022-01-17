import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../../store/book';
import './GetBooks.css';
import DeleteBook from '../DeleteBook/DeleteBook';
import EditBook from '../EditBook/EditBook';
import { NavLink } from 'react-router-dom';


export default function GetBooks(){
    const dispatch= useDispatch();
    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);


    const [openId, setOpenId]=useState(null);
    const handleClick= (id) => {
      if (openId===id) {
        setOpenId(null)
      } else {
        setOpenId(id)
      }
    }
    return(
        <div className="get-books-parent">




            {books.map(({ id, book_name }) => (
              <div className='book' key={id}>
                    <NavLink to={`/books/${id}`}>
                      <button className='book-button' onClick={()=>handleClick(id)}>{book_name}</button>
                    </NavLink>
                    <div className='makerow'>
                      {
                        openId===id?<EditBook id = {id}/>:null
                      }
                      {
                        openId===id?<DeleteBook id={id}/>:null
                      }
                    </div>
              </div>
            ))}

        </div>
    )
}
