import { SET_FORM_ERROR, CLEAR_ERRORS  } from '../../actions_learn';

const initialState = {
  errors: [],
  disable: 'false'
}

export default function forms(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_ERROR:
      return { ...state, errors: action.payload.errors }
    case CLEAR_ERRORS:
      let errors = state.errors;
      errors[action.payload] = null;
      return { ...state, errors }
    default:
      return state
  }
}
