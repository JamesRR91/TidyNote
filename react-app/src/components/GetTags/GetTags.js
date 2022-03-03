import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTags } from '../../store/tag';
import EditTag from '../EditTag/EditTag';
import DeleteTag from '../DeleteTag/DeleteTag';
import './GetTags.css';
import { NavLink } from 'react-router-dom';
import { FaTag, FaEdit } from 'react-icons/fa';

export default function GetTags() {
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState(null);
  const tagsObj = useSelector((state) => state.tag.entries);
  const tags = Object.values(tagsObj);
  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const handleClick = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };
  return (

    <div className='get-tags-parent'>
      {tags.map(({ id, tag_name }) => (
        <div className='book' key={id}>
          <div className='bookName_and_icon'>
            <FaTag id='book-logo' color='rgb(15, 89, 119)' />
            <NavLink to={`/tags/${id}`}>
              <button className='tag-button'>{tag_name}</button>
            </NavLink>
            <button
              className='edit-book-button'
              onClick={() => handleClick(id)}
            >
              <FaEdit id='book-logo' />
            </button>
          </div>
          <div className='makerow'>
            {openId === id ? <EditTag id={id} /> : null}
            {openId === id ? <DeleteTag id={id} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
