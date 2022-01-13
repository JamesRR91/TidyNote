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

            {tags.map(({ id, tag_name }) => (
                <div className='book' key={id}>
                    <div className='tag'>
                        {tag_name}
                    </div>
                    <div className='makerow'>
                        <EditTag id={id} />
                        <DeleteTag id={id} />
                    </div>
                </div>
            ))}
        
        </div>
    )
}
