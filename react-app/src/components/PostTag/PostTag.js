import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTag } from '../../store/tag';
import './PostTag.css';

export default function PostTag(){
    const [name, setName] = useState("");
    const dispatch= useDispatch();

      const reset = () => {
        setName("");
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
          return alert('Your tag must have a name.')
        }

        if(name.length > 15) {
            return alert ('Too many characters.')
        }

        const newTag = {
          tag_name: name
        };
        dispatch(createTag(newTag));
        reset();
      };
    return(
        <div className="PostTag">
          <form className='input-data' onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="New Tag"
              name="name"
            />
            <button className='submit-button' type="submit">Save</button>
          </form>
        </div>
        );
};
