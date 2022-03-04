

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-toastify/dist/ReactToastify.css';
import './EditNote.css';
import {RiSave3Fill} from 'react-icons/ri'

import DeleteNote from '../DeleteNote/DeleteNote';


export default function EditNote({ id }) {
  const booksObj = useSelector((state) => state.book.entries);
  const books = Object.values(booksObj);
  const firstBook = books[0]?.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const note = useSelector((state) => state.note.entries[id]);

  const [text, setText] = useState(note.note_text);
  const [name, setName] = useState(note.note_name);
  const [bookId, setBookId] = useState(note.bookId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      return alert('Your note must have a name.')
    }

    if(!text) {
        return alert('Your note must have content.')
    }

    if(bookId===undefined) {
        return alert('Please select a notebook!')
    }


    const payload = {
      ...note,
      note_text: text,
      note_name: name,
      bookId,
    };
    dispatch(updateNote(payload));
  };

  const editorConfiguration = {
    toolbar: [
      'bold', 'italic', '|',
      'link', '|',
      // 'bulletedList', 'numberedList', '|',
      'blockQuote', '|',
      'undo', 'redo'
    ], shouldNotGroupWhenFull: true
 };

  return (
    <div className='InputBox'>
      <form  onSubmit={handleSubmit}>
        <input className='input-data'
          id='newNoteOrEditNoteBox'
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          text='name'
          autocomplete="off"
          required
        />
        <CKEditor className='input-data'
            editor={ClassicEditor}
            config={ editorConfiguration }
            data={text}
            onChange={(event, editor) => {
            const data = editor.getData();

            setText(data)

            }}
            required
        />
        {/* <div className='makerow'> */}
        <div className='editing-note-bar'>
        <select className='selectBookDropDown'
          onChange={(e) => setBookId(e.target.value)}
          value={bookId}
          required
        >
          <option value=''>Please Select A Notebook</option>

          {books.map(({ id, book_name }) => (
            <option value={id}>{book_name}</option>
          ))}
        </select>

        <button onClick={handleSubmit} className='save-note-button' type="submit"><RiSave3Fill size='25px'/></button>
        <DeleteNote id={id} />
        </div>
      </form>
    </div>
  );
}
