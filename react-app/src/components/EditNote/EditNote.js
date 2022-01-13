import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditNote.css';


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

    const payload = {
      ...note,
      note_text: text,
      note_name: name,
      bookId,
    };
    dispatch(updateNote(payload));
  };

  return (
    <div className='InputBox'>
      <form  onSubmit={handleSubmit}>
        <input className='input-data'
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          text='name'
        />
        <CKEditor className='input-data'
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
            const data = editor.getData();

            setText(data)

            }}
        />
        <select className='input-data'
          onChange={(e) => setBookId(e.target.value)}
          value={bookId}
          required
        >
          <option value=''>Please choose a notebook</option>

          {books.map(({ id, book_name }) => (
            <option value={id}>{book_name}</option>
          ))}
        </select>

        <button type='submit' className='delete-button'>
          Edit
        </button>
      </form>
    </div>
  );
}
