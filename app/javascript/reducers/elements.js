import { SET_ELEMENTS, ADD_ELEMENT, EDIT_ELEMENT, UPDATE_ELEMENT } from '../actions';

const initialState = {
  elements: [],
  editingElement: null
}

export default function elements(state = initialState, action) {
  let payload = action.payload;
  switch (action.type) {
    case SET_ELEMENTS:
      return { ...state, elements: payload }

    case ADD_ELEMENT:
      var newElements = state.elements.filter((elem) => {
        return elem.id !== payload.id
      });
      var elements = newElements.concat([payload])
      return { ...state, elements }

    case EDIT_ELEMENT:
      return { ...state, editingElement: payload }

    case UPDATE_ELEMENT:
      var newElements = state.elements.filter((elem) => {
        return elem.id !== payload.id
      });
      var elements = newElements.concat([payload])
      return { ...state, elements }

    default:
      return state
  }
}
