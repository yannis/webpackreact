import {
  SET_QUESTIONS,
  SET_INCLUDED_QUESTIONS,
  ADD_QUESTION,
  EDIT_QUESTION,
  CANCEL_EDIT_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  SHOW_QUESTION_ANSWER_FORM
} from '../../actions_learn';

const initialState = {
  questions: [],
  editQuestion: null,
}

export default function question(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      let questions = action.payload.data
      return { ...state, questions  }
    case SET_INCLUDED_QUESTIONS:
      if (action.payload.included) {
        var newQuestions = action.payload.included.filter((item) => {
          return _.includes(['questions'], item.type);
        })
        let newQuestionIds = _.map(newQuestions, 'id');
        var questions = state.questions.filter((question) => {
          return !_.includes(newQuestionIds, question.id)
        }).concat(newQuestions)
        return { ...state, questions }
      }
    case ADD_QUESTION:
      var newQuestions = state.questions.filter((question) => {
        return question.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, questions: newQuestions }
    case REMOVE_QUESTION:
      questions = state.questions.filter((question) => {
        return question.id !== action.payload.data.id
      });
      return { ...state, questions }
    case EDIT_QUESTION:
      return { ...state, editQuestion: action.payload }
    case CANCEL_EDIT_QUESTION:
      return { ...state, editQuestion: null }
    case SHOW_QUESTION_ANSWER_FORM:
      return { ...state, showingQuestionAnswerForm: action.payload }
    case UPDATE_QUESTION:
      var newQuestions = state.questions.filter((question) => {
        return question.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, questions: newQuestions }
    default:
      return state
  }
}
