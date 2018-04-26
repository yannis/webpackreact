// API
export const API = 'API';

// UNIT
export const FETCH_UNIT = 'FETCH_UNIT';
export const SET_UNIT = 'SET_UNIT';
export const CANCEL_EDITING = 'CANCEL_EDITING';

export const SHOW_MARKDOWN_PREVIEW = 'SHOW_MARKDOWN_PREVIEW';

// BLOCKS
export const SET_BLOCKS = 'SET_BLOCKS';
export const SET_BLOCK_FORM = 'SET_BLOCK_FORM';
export const SORT_BLOCKS = 'SORT_BLOCKS';
export const ADD_BLOCK = 'ADD_BLOCK';
export const ADD_BLOCK_AND_ELEMENT = 'ADD_BLOCK_AND_ELEMENT';
export const UPDATE_BLOCK_AND_ELEMENT = 'UPDATE_BLOCK_AND_ELEMENT';
export const AUTOUPDATE_BLOCK_AND_ELEMENT = 'AUTOUPDATE_BLOCK_AND_ELEMENT';
export const DESTROY_BLOCK = 'DESTROY_BLOCK';
export const REMOVE_BLOCK = 'REMOVE_BLOCK';
export const UPDATE_BLOCK = 'UPDATE_BLOCK';

// ELEMENTS
export const SET_ELEMENTS = 'SET_ELEMENTS';
export const ADD_ELEMENT = 'ADD_ELEMENT';
export const EDIT_ELEMENT = 'EDIT_ELEMENT';
export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';

// TEACHERS
export const FETCH_TEACHERS = 'FETCH_TEACHERS';
export const SET_TEACHERS = 'SET_TEACHERS';

// REVIEWS
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const SET_REVIEWS = 'SET_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';

// RESOURCES
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const SET_RESOURCES = 'SET_RESOURCES';
export const SET_RESOURCE_FORM = 'SET_RESOURCE_FORM';
export const SORT_RESOURCES = 'SORT_RESOURCES';
export const ADD_RESOURCE = 'ADD_RESOURCE';
export const EDIT_RESOURCE = 'EDIT_RESOURCE';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';

// FORM
export const SET_FORM_ERROR = 'SET_FORM_ERROR';

// API
export function fetchData(payload = null) {
  return {
    type: API,
    payload
  }
}
// general FETCH (middlware)
export const FETCH = 'FETCH';
export function fetch(payload = null) {
  return {
    type: FETCH,
    payload
  }
}

// UNIT
export function fetchUnit(payload = null) {
  return {
    type: FETCH_UNIT,
    payload
  }
}
export function cancelEditing() {
  return {
    type: CANCEL_EDITING
  }
}

export function setUnit(payload = null) {
  return {
    type: SET_UNIT,
    payload
  }
}

export function showMarkdownPreview(payload = null) {
  return {
    type: SHOW_MARKDOWN_PREVIEW,
    payload
  }
}

// BLOCKS
export function setBlocks(payload = null) {
  return {
    type: SET_BLOCKS,
    payload
  }
}

export function setBlockForm(payload = null) {
  return {
    type: SET_BLOCK_FORM,
    payload
  }
}

export function sortBlocks(payload = null) {
  return {
    type: SORT_BLOCKS,
    payload,
  }
}

export function destroyBlock(payload = {}) {
  return {
    type: DESTROY_BLOCK,
    payload,
  }
}

export function addBlock(payload = {}) {
  return {
    type: ADD_BLOCK,
    payload,
  }
}

export function updateBlock(payload = {}) {
  return {
    type: UPDATE_BLOCK,
    payload,
  }
}

export function removeBlock(payload = {}) {
  return {
    type: REMOVE_BLOCK,
    payload,
  }
}

// ELEMENTS
export function setElements(payload = null) {
  return {
    type: SET_ELEMENTS,
    payload
  }
}

export function addElement(payload = null) {
  return {
    type: ADD_ELEMENT,
    payload
  }
}

export function editElement(payload = {}) {
  return {
    type: EDIT_ELEMENT,
    payload,
  }
}

export function updateElement(payload = {}) {
  return {
    type: UPDATE_ELEMENT,
    payload,
  }
}

// TEACHERS
export function fetchTeachers(payload = null) {
  return {
    type: FETCH_TEACHERS,
    payload
  }
}

export function setTeachers(payload = null) {
  return {
    type: SET_TEACHERS,
    payload
  }
}

// REVIEWS
export function fetchReviews(payload = null) {
  return {
    type: FETCH_REVIEWS,
    payload
  }
}

export function setReviews(payload = null) {
  return {
    type: SET_REVIEWS,
    payload
  }
}

export function addReview(payload = null) {
  return {
    type: ADD_REVIEW,
    payload
  }
}

// RESOURCES
export function fetchResources(payload = null) {
  return {
    type: FETCH_RESOURCES,
    payload
  }
}

export function setResources(payload = null) {
  return {
    type: SET_RESOURCES,
    payload
  }
}

export function setResourceForm(payload = false) {
  return {
    type: SET_RESOURCE_FORM,
    payload
  }
}

export function sortResources(payload = null) {
  return {
    type: SORT_RESOURCES,
    payload
  }
}

export function editResource(payload = null) {
  return {
    type: EDIT_RESOURCE,
    payload
  }
}

export function addResource(payload = null) {
  return {
    type: ADD_RESOURCE,
    payload
  }
}

export function setFormsError(payload = null) {
  return {
    type: SET_FORM_ERROR,
    payload
  }
}
