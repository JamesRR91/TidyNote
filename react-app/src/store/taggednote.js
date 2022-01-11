const LOAD_TAGGEDNOTES = 'taggednotes/LOAD_TAGGEDNOTES';
const ADD_TAGGEDNOTE = 'taggednotes/ADD_TAGGEDNOTE';
const REMOVE_TAGGEDNOTE = 'taggednotes/REMOVE_TAGGEDNOTE';

const load = (taggedNotes) => {
  return { type: LOAD_TAGGEDNOTES, taggedNotes };
};

const add = (newTaggedNote) => {
  return { type: ADD_TAGGEDNOTE, newTaggedNote };
};

const remove = (taggedNoteId) => {
  return { type: REMOVE_TAGGEDNOTE, taggedNoteId };
};

export const getAllTaggedNotes = () => async (dispatch) => {
  const response = await fetch('/api/taggednotes');
  const taggedNotes = await response.json();
  dispatch(load(taggedNotes));
  return taggedNotes;
};

export const createTaggedNote = (newTaggedNote) => async (dispatch) => {
  const response = await fetch(`/api/taggednotes`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTaggedNote)
  });
  const taggedNote = await response.json();

  if (response.ok) {
    dispatch(add(taggedNote));
    return taggedNote;
  }
};

export const deleteTaggedNote = (taggedNoteId) => async (dispatch) => {
  const response = await fetch(`/api/taggednotes/${taggedNoteId}`, {
    method: 'delete'
  });

  if (response.ok) {
    // const taggedNote = await response.json();
    dispatch(remove(taggedNoteId));
  }
};

const initialState = { entries: {} };

const taggedNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAGGEDNOTES: {
      const newState = { ...state, entries: {} };
      for (let i = 0; i < action.taggedNotes.length; i++) {
        let taggedNote = action.taggedNotes[i];
        newState.entries[taggedNote.id] = taggedNote;
      }
      return newState;
    };
    case ADD_TAGGEDNOTE: {
      const newState = { ...state, entries: { ...state.entries, [action.newTaggedNote.id]: action.newTaggedNote } };
      return newState;
    };
    case REMOVE_TAGGEDNOTE: {
      const newState = { ...state, entries: { ...state.entries } };
      delete newState.entries[action.taggedNoteId];
      return newState;
    };
    default:
      return state;
  }
};

export default taggedNoteReducer;
