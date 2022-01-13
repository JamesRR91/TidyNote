import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../../store/book';
import './GetBooks.css';
import DeleteBook from '../DeleteBook/DeleteBook';
import EditBook from '../EditBook/EditBook';


export default function GetBooks(){
    const dispatch= useDispatch();
    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);


    const [open, setOpen] = useState(false)

    return(
        <div className="get-books-parent">

        {/* <button onClick={() => setOpen(!open)}>{book_name}</button> */}

        {/* {
          open?<EditBook id = {id}/>:null
          open?<DeleteBook id={id}/>:null
        }
 */}



            {books.map(({ id, book_name }) => (
              <div className='book' key={id}>
                    <button className='book-button' onClick={() => setOpen(!open)}>{book_name}</button>
                    <div className='makerow'>
                      {
                        open?<EditBook id = {id}/>:null
                      }
                      {
                        open?<DeleteBook id={id}/>:null
                      }
                    </div>
              </div>
            ))}

        </div>
    )
}
