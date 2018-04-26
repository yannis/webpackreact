import { SET_FORM_ERROR  } from '../actions';

const initialState = {
  errors: [],
}

export default function forms(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_ERROR:
      return { ...state, errors: action.payload.errors }
    default:
      return state
  }
}
