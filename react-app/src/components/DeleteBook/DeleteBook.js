import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBook } from '../../store/book';
import './DeleteBook.css';

function DeleteBook({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteBook(id));
    history.push('/');
  };

  return (
    <button className="delete-button" onClick={handleSubmit}>
      Delete
    </button>
  );

};

export default DeleteBook;
