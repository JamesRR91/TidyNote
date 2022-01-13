import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteTag } from "../../store/tag";
import './DeleteTag.css';

function DeleteTag({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTag(id));
    history.push('/');
  };

  return (
    <button className="delete-button" onClick={handleSubmit}>
      Delete
    </button>
  );

};

export default DeleteTag;
