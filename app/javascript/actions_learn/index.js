// general FETCH (middlware)
export const FETCH = 'FETCH';
export function fetch(payload = null) {
  return {
    type: FETCH,
    payload
  }
}

// UNITS
export const SET_COMPLETION_STATE = 'SET_COMPLETION_STATE';
export function setCompletionState(payload = null) {
  return {
    type: SET_COMPLETION_STATE,
    payload
  }
}

// COMMENTS
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_INCLUDED_COMMENTS = 'SET_INCLUDED_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export function setComments(payload = null) {
  return {
    type: SET_COMMENTS,
    payload
  }
}
export function setIncludedComments(payload = null) {
  return {
    type: SET_INCLUDED_COMMENTS,
    payload
  }
}
export function addComment(payload = null) {
  return {
    type: ADD_COMMENT,
    payload
  }
}
export function removeComment(payload = null) {
  return {
    type: REMOVE_COMMENT,
    payload
  }
}
export function editComment(payload = null) {
  return {
    type: EDIT_COMMENT,
    payload
  }
}
export function cancelEditComment(payload = null) {
  return {
    type: EDIT_COMMENT,
    payload: null
  }
}
export function updateComment(payload = null) {
  return {
    type: UPDATE_COMMENT,
    payload
  }
}

// QUESTIONS
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_INCLUDED_QUESTIONS = 'SET_INCLUDED_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const CANCEL_EDIT_QUESTION = 'CANCEL_EDIT_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const SHOW_QUESTION_ANSWER_FORM = 'SHOW_QUESTION_ANSWER_FORM';
export function setQuestions(payload = null) {
  return {
    type: SET_QUESTIONS,
    payload
  }
}
export function setIncludedQuestions(payload = null) {
  return {
    type: SET_INCLUDED_QUESTIONS,
    payload
  }
}
export function addQuestion(payload = null) {
  return {
    type: ADD_QUESTION,
    payload
  }
}
export function removeQuestion(payload = null) {
  return {
    type: REMOVE_QUESTION,
    payload
  }
}
export function editQuestion(payload = null) {
  return {
    type: EDIT_QUESTION,
    payload
  }
}
export function cancelEditQuestion(payload = null) {
  return {
    type: EDIT_QUESTION,
    payload: null
  }
}
export function updateQuestion(payload = null) {
  return {
    type: UPDATE_QUESTION,
    payload
  }
}
export function showQuestionAnswerForm(payload = null) {
  return {
    type: SHOW_QUESTION_ANSWER_FORM,
    payload
  }
}

// QUESTION_ANSWERS
export const SET_INCLUDED_QUESTION_ANSWERS = 'SET_INCLUDED_QUESTION_ANSWERS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER';
export const EDIT_QUESTION_ANSWER = 'EDIT_QUESTION_ANSWER';
export const CANCEL_EDIT_QUESTION_ANSWER = 'CANCEL_EDIT_QUESTION_ANSWER';
export const UPDATE_QUESTION_ANSWER = 'UPDATE_QUESTION_ANSWER';
export function setIncludedQuestionAnswers(payload = null) {
  return {
    type: SET_INCLUDED_QUESTION_ANSWERS,
    payload
  }
}
export function addQuestionAnswer(payload = null) {
  return {
    type: ADD_QUESTION_ANSWER,
    payload
  }
}
export function removeQuestionAnswer(payload = null) {
  return {
    type: REMOVE_QUESTION_ANSWER,
    payload
  }
}
export function editQuestionAnswer(payload = null) {
  return {
    type: EDIT_QUESTION_ANSWER,
    payload
  }
}
export function cancelEditQuestionAnswer(payload = null) {
  return {
    type: EDIT_QUESTION_ANSWER,
    payload: null
  }
}
export function updateQuestionAnswer(payload = null) {
  return {
    type: UPDATE_QUESTION_ANSWER,
    payload
  }
}

// USERS
export const SET_INCLUDED_USERS = 'SET_INCLUDED_USERS';
export function setIncludedUsers(payload = null) {
  return {
    type: SET_INCLUDED_USERS,
    payload
  }
}

// FORMS
export const SET_FORM_ERROR = 'SET_FORM_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export function setFormsError(payload = null) {
  return {
    type: SET_FORM_ERROR,
    payload
  }
}
export function clearErrors(payload = null) {
  return {
    type: CLEAR_ERRORS,
    payload
  }
}
