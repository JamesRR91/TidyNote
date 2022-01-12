const LOAD_BOOKS = 'books/LOAD_BOOKS';
const ADD_BOOK = 'books/ADD_BOOK';
const REMOVE_BOOK = 'books/REMOVE_BOOK';
const UPDATE_BOOK = 'books/UPDATE_BOOK';

const load = (books) => {
  return { type: LOAD_BOOKS, books };
};

const add = (newBook) => {
  return { type: ADD_BOOK, newBook };
};

const remove = (bookId) => {
  return { type: REMOVE_BOOK, bookId };
};

const update = (book) => {
  return { type: UPDATE_BOOK, book};
};

export const getBooks = () => async (dispatch) => {
  const response = await fetch('/api/books/');

  if (response.ok) {
    const books = await response.json();
    dispatch(load(books.all_books));
    return books;
  }
};

export const createBook = (newBook) => async (dispatch) => {
  const response = await fetch(`/api/books/new_book`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  });
  const book = await response.json();

  if (response.ok) {
    dispatch(add(book));
    return book;
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}`, {
    method: 'delete'
  });

  if (response.ok) {
    const book = await response.json();
    dispatch(remove(book.id));
  }
};

export const updateBook = (data) => async (dispatch) => {
  const response = await fetch(`/api/books/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const book = await response.json();
    dispatch(update(book));
    return book;
  }
}

const initialState = { entries: {} };

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKS: {
      const newState = { ...state, entries: {} };
      for (let i = 0; i < action.books.length; i++) {
        let book = action.books[i];
        newState.entries[book.id] = book;
      }
      return newState;
    };
    case ADD_BOOK: {
      const newState = { ...state, entries: { ...state.entries, [action.newBook.id]: action.newBook } };
      return newState;
    };
    case REMOVE_BOOK: {
      const newState = { ...state, entries: { ...state.entries } };
      delete newState.entries[action.bookId];
      return newState;
    };
    case UPDATE_BOOK: {
      const newState = { ...state, entries: { ...state.entries, [action.book.id]: action.book } };
      return newState;
    };
    default:
      return state;
  }
};

export default bookReducer;
