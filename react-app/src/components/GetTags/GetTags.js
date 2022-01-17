import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTags } from '../../store/tag';
import EditTag from '../EditTag/EditTag';
import DeleteTag from '../DeleteTag/DeleteTag';
import './GetTags.css';
import { NavLink } from 'react-router-dom';

export default function GetTags(){
    const dispatch= useDispatch();
    const [openId, setOpenId]=useState(null);
    const tagsObj = useSelector((state) => state.tag.entries);
    const tags = Object.values(tagsObj);
    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch]);

    const handleClick= (id) => {
        if (openId===id) {
          setOpenId(null)
        } else {
          setOpenId(id)
        }
      }
    return(
        <div className="get-tags-parent">
            {tags.map(({ id, tag_name }) => (
                <div className='book' key={id}>
                    <NavLink to={`/tags/${id}`}>
                      <button className='tag-button' onClick={() => handleClick(id)}>{tag_name}</button>
                    </NavLink>

                    <div className='makerow'>
                    {
                        openId===id?<EditTag id = {id}/>:null
                      }
                      {
                        openId===id?<DeleteTag id={id}/>:null
                      }
                    </div>
                </div>
            ))}
        </div>
    )
}
