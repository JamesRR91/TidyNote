import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteNote } from "../../store/note";
import './DeleteNote.css';

function DeleteNote({ id }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(deleteNote(id));
      history.push('/');
    };

    return (
      <button className="delete-button" onClick={handleSubmit}>
        Delete
      </button>
    );

  };

  export default DeleteNote;
