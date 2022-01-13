import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import { getBooks } from '../../store/book';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostNote.css';


export default function PostNote(){
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
        // console.log('HERE WE GO AGAIN', bookId)
        // if(bookId===undefined) {
        //     return alert('Please select a notebook!')
        // }

        const newNote = {
          note_name: name,
          note_text: text,
          bookId
        };
        dispatch(createNote(newNote));
        reset();
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


    return(
        <div className="PostNote">
          <form onSubmit={handleSubmit}>
            <input className='input-data'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="New Note"
              name="name"
            />
          <CKEditor
              editor={ClassicEditor}
              config={ editorConfiguration }
              data={text}
              onChange={(event, editor) => {
              const data = editor.getData();
              setText(data)

              }}
          />
            <select className='input-data'
            onChange={(e)=>setBookId(e.target.value)}
            value={bookId}
            required
            >
            <option value=''>Please choose a notebook</option>

            {books.map(({ id, book_name }) => (
                <option value={id}>{book_name}</option>))}
            </select>

            <button className='submit-button' type="submit">Save</button>
          </form>
        </div>
        );
};
