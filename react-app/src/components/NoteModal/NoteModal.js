import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {RiSave3Fill} from 'react-icons/ri';
import { useParams } from "react-router";

import './NoteModal.css';


export default function PostNoteModal({hideForm}){
    const booksObj = useSelector((state) => state.book.entries);
    const books = Object.values(booksObj);
    const firstBook=books[0]?.id;
    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);
    // const firstBookId=firstBook.id;
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [errors, setErrors] = useState([]);
    // console.log('TESTING TESTING', books[0].book_name)
    const [bookId, setBookId]=useState(firstBook);
    // const booksObj = useSelector((state) => state.book.entries);
    // const books = Object.values(booksObj);
    // useEffect(() => {
    //     dispatch(getBooks());
    // }, [dispatch]);
      const reset = () => {
        setName("");
        setText("");
        setBookId(firstBook);
      };

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

        const newNote = {
          note_name: name,
          note_text: text,
          bookId
        };
        // dispatch(createNote(newNote));
        // reset();
        if(newNote.note_text.length>0){
            setErrors([]);
            let submittedNote=  dispatch (createNote(newNote))
              .catch(async (res) => {
                  const data = await res.json();
                  if (data && data.errors) setErrors(data.errors);
              }
              );
              if(submittedNote){
                  hideForm();
              }
        }
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

    return(
          <div className="PostNote">
            <form className='input-data-modal' onSubmit={handleSubmit}>
              <input className='input-data-modal'
                id="newNoteOrEditNoteBox"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="New Note"
                name="name"
                autocomplete="off"
                required
              />
            <CKEditor  className='input-data-modal'
                editor={ClassicEditor}
                config={ editorConfiguration }
                data={text}
                onChange={(event, editor) => {
                const data = editor.getData();
                setText(data)

              }}
              required
            />
              <div className='editing-note-bar'>
              <select className='selectBookDropDown'
              onChange={(e)=>setBookId(e.target.value)}
              value={bookId}
              required
              >
              <option value=''>Please Select A Notebook</option>

              {books.map(({ id, book_name }) => (
                  <option value={id}>{book_name}</option>))}
              </select>

              <button className='save-note-button' type="submit"><RiSave3Fill size='25px'/></button>
              </div>
            </form>
          </div>
        );
};
