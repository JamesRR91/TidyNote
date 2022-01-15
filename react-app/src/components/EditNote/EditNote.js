

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditNote.css';
import Footer from '../Footer/Footer'

// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
// console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));



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
    console.log('HERE WE GO AGAIN', bookId)
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
      'heading', '|',
      'bold', 'italic', '|',
      'link', '|',
      // 'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      // 'code', 'codeBlock', '|',
      'insertTable', '|',
      'blockQuote', '|',
      'undo', 'redo'
    ], shouldNotGroupWhenFull: true
 };


  // const notify = () => {
  //   if (!name && !text && !bookId) {
  //     toast.error("Your note needs some information!")
  //   } else if (!name) {
  //     toast.error("The note needs a name!");
  //   } else if (!text) {
  //     toast.error("The note needs some content!");
  //   } else if (!bookId) {
  //     toast.error("The note needs to be assigned to a book!");
  //   } else {
  //     toast.success("Saved!")
  //   }
  // }

  return (
    <div className='InputBox'>
      <form  onSubmit={handleSubmit}>
        <input className='input-data'
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          text='name'
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
        <div className='makerow'>
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

        <button onClick={handleSubmit} className='delete-button' type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}
