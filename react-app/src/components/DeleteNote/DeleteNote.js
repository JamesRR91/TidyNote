import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteNote } from "../../store/note";
import './DeleteNote.css';
import {MdDeleteForever} from 'react-icons/md'

function DeleteNote({ id }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(deleteNote(id));
      // history.push('/');
    };

    return (
      <button className="delete-button" onClick={handleSubmit}>
      <MdDeleteForever size='25px' />
      </button>
    );

  };

  export default DeleteNote;
