import {
  SET_COMPLETION_STATE,
} from '../../actions_learn';

const initialState = {
  completions: {},
}

export default function unit(state = initialState, action) {
  switch (action.type) {
    case SET_COMPLETION_STATE:
      return Object.assign({}, state, {
        unit,
        completions: action.payload.completions
      })
    default:
      return state
  }
}
