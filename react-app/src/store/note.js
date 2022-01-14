const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

const load = (notes) => {
  return { type: LOAD_NOTES, notes };
};

const add = (newNote) => {
  return { type: ADD_NOTE, newNote };
};

const remove = (noteId) => {
  return { type: REMOVE_NOTE, noteId };
};

const update = (note) => {
  return { type: UPDATE_NOTE, note};
};

export const getAllNotes = () => async (dispatch) => {
  const response = await fetch('/api/notes/');
  const notes = await response.json();
  dispatch(load(notes.all_notes));
  return notes;
};

export const createNote = (newNote) => async (dispatch) => {
  const response = await fetch(`/api/notes/new_note`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote)
  });
  const note = await response.json();

  if (response.ok) {
    dispatch(add(note));
    return note;
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'delete'
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(remove(note.id));
  }
};

export const updateNote = (data) => async (dispatch) => {
  const response = await fetch(`/api/notes/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(update(note));
    return note;
  }
}

const initialState = { entries: {} };

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      const newState = { ...state, entries: {} };
      for (let i = 0; i < action.notes.length; i++) {
        let note = action.notes[i];
        newState.entries[note.id] = note;
      }
      return newState;
    };
    case ADD_NOTE: {
      const newState = { ...state, entries: { ...state.entries, [action.newNote.id]: action.newNote } };
      return newState;
    };
    case REMOVE_NOTE: {
      const newState = { ...state, entries: { ...state.entries } };
      delete newState.entries[action.noteId];
      return newState;
    };
    case UPDATE_NOTE: {
      const newState = { ...state, entries: { ...state.entries, [action.note.id]: action.note } };
      return newState;
    };
    default:
      return state;
  }
};

export default noteReducer;
