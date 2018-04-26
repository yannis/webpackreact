import { SET_UNIT, SHOW_MARKDOWN_PREVIEW, CANCEL_EDITING } from '../actions';

const initialState = {
  url: null,
  unit: null,
  editing: false
}

export default function units(state = initialState, action) {
  switch (action.type) {
    case SET_UNIT:
      let unit = action.payload.data || action.payload;
      return Object.assign({}, state, {
        unit,
        editing: false
      })
    case CANCEL_EDITING:
     return {...state, editing: false}
    case SHOW_MARKDOWN_PREVIEW:
     return {...state, pagePreview: action.payload}
    default:
      return state
  }
}
