import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../../store/note';
import PostNote from '../PostNote/PostNote';
import EditNote from '../EditNote/EditNote'
import DeleteNote from '../DeleteNote/DeleteNote';
import { getAllTaggedNotes } from '../../store/taggednote';
import TaggingNotes from '../TaggingNotes/TaggingNotes';
import './SeeTaggedNotes.css';

export default function SeeTaggedNotes({id}){
  const dispatch= useDispatch();
  const taggedObj = useSelector((state) => state.tagged.entries);
  const taggedNotes = Object.values(taggedObj);
  const tagsObj = useSelector((state) => state.tag.entries);
  const tags = Object.values(tagsObj);
  useEffect(() => {
      dispatch(getAllTaggedNotes());
  }, [dispatch]);

  const matches = taggedNotes.filter((taggedNote) => taggedNote.noteId === id);
  const matchingTagIds = matches.map((match) => match.tagId);
  const matchingTags = tags.filter((tag) => matchingTagIds.includes(tag.id));
  const nonMatchingTags = tags.filter((tag) => !matchingTagIds.includes(tag.id));
  return (
    <>
      <span className="taglist">
          {tags.length > 0 && tags.map((tag) => (
            <div className='seetag' id={`tag-${tag.id}`} key={tag.id}>
              <i className="fas fa-tag" />
              {tag.tag_name}
              <TaggingNotes
               note_id={id}
               tag_id={tag.id}
               tag_name={tag.tag_name}
               tagged={matchingTagIds.includes(tag.id)}
               taggedNote_id={Object.keys(taggedObj).find(key => taggedObj[key].noteId === id && taggedObj[key].tagId === tag.id)}/>

            </div>
          ))}

      </span>
    </>
  )
}
