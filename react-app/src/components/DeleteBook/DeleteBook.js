import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBook } from '../../store/book';
import './DeleteBook.css';
import { MdDeleteForever } from 'react-icons/md'


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
      <MdDeleteForever size='25px' />
    </button>
  );

};

export default DeleteBook;
