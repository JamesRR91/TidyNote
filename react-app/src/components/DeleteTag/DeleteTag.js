import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteTag } from "../../store/tag";
import './DeleteTag.css';
import { MdDeleteForever } from 'react-icons/md';

function DeleteTag({ id }) {
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTag(id));
    // history.push('/');
  };

  return (
    <button className="delete-button" onClick={handleSubmit}>
      <MdDeleteForever size='25px' />
    </button>
  );

};

export default DeleteTag;
