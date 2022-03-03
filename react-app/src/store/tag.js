const LOAD_TAGS = 'tags/LOAD_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const REMOVE_TAG = 'tags/REMOVE_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';

const load = (tags) => {
  return { type: LOAD_TAGS, tags };
};

const add = (newTag) => {
  return { type: ADD_TAG, newTag };
};

const remove = (tagId) => {
  return { type: REMOVE_TAG, tagId };
};

const update = (tag) => {
  return { type: UPDATE_TAG, tag};
};

export const getAllTags = () => async (dispatch) => {
  const response = await fetch('/api/tags/');
  const tags = await response.json();
  dispatch(load(tags.all_tags));
  return tags;
};

export const createTag = (newTag) => async (dispatch) => {
  const response = await fetch(`/api/tags/new_tag`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTag)
  });

  if (response.ok) {
    const tag = await response.json();
    dispatch(add(tag));
    return tag;
  }
};

export const deleteTag = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`, {
    method: 'delete'
  });

  if (response.ok) {
    const tag = await response.json();
    dispatch(remove(tag.id));
  }
};

export const updateTag = (data) => async (dispatch) => {
  const response = await fetch(`/api/tags/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const tag = await response.json();
    dispatch(update(tag));
    return tag;
  }
}

const initialState = { entries: {} };

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAGS: {
      const newState = { ...state, entries: {} };
      for (let i = 0; i < action.tags?.length; i++) {
        let tag = action.tags[i];
        newState.entries[tag.id] = tag;
      }
      return newState;
    };
    case ADD_TAG: {
      const newState = { ...state, entries: { ...state.entries, [action.newTag.id]: action.newTag } };
      return newState;
    };
    case REMOVE_TAG: {
      const newState = { ...state, entries: { ...state.entries } };
      delete newState.entries[action.tagId];
      return newState;
    };
    case UPDATE_TAG: {
      const newState = { ...state, entries: { ...state.entries, [action.tag.id]: action.tag } };
      return newState;
    };
    default:
      return state;
  }
};

export default tagReducer;
