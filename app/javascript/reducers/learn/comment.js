import {
  SET_COMMENTS,
  SET_INCLUDED_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  CANCEL_EDIT_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from '../../actions_learn';

const initialState = {
  comments: [],
  editComment: null,
}

export default function comment(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      let comments = action.payload.data
      return { ...state, comments  }
    case SET_INCLUDED_COMMENTS:
      if (action.payload.included) {
        var newComments = action.payload.included.filter((item) => {
          return _.includes(['comments'], item.type);
        })
        let newCommentIds = _.map(newComments, 'id');
        var comments = state.comments.filter((comment) => {
          return !_.includes(newCommentIds, comment.id)
        }).concat(newComments)
        return { ...state, comments }
      }
    case ADD_COMMENT:
      var newComments = state.comments.filter((comment) => {
        return comment.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, comments: newComments }
    case REMOVE_COMMENT:
      comments = state.comments.filter((comment) => {
        return comment.id !== action.payload.data.id
      });
      return { ...state, comments }
    case EDIT_COMMENT:
      return { ...state, editComment: action.payload }
    case CANCEL_EDIT_COMMENT:
      return { ...state, editComment: null }
    case UPDATE_COMMENT:
      var newComments = state.comments.filter((comment) => {
        return comment.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, comments: newComments }
    default:
      return state
  }
}
