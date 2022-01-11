import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../../store/book';
import './GetBooks.css';

export default function GetBooks(){
    const dispatch= useDispatch();
    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);
    return(
        <div className="get-books-parent">
        <div className='books-list'>
                {books.length>0 ? books.map(({id, book_name}) => (
                    <RecipeDetail id={id}
                        key={id}
                        book_name={book_name}
                    />
                )):null}

        </div>
    )
}
