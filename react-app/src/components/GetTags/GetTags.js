import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTags } from '../../store/tag';
import EditTag from '../EditTag/EditTag';
import DeleteTag from '../DeleteTag/DeleteTag';
import './GetTags.css';

export default function GetTags(){
    const dispatch= useDispatch();
    const tagsObj = useSelector((state) => state.tag.entries);
    const tags = Object.values(tagsObj);
    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch]);
    return(
        <div className="get-tags-parent">
          <ul>
            {tags.map(({ id, tag_name }) => (
                <li key={id}>
                    <div className='tag'>
                    {tag_name}
                    <EditTag id={id} />
                    <DeleteTag id={id} />
                    </div>
                </li>
            ))}
          </ul>
        </div>
    )
}
