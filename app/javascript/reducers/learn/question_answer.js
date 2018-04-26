import {
  SET_INCLUDED_QUESTION_ANSWERS,
  ADD_QUESTION_ANSWER,
  REMOVE_QUESTION_ANSWER,
  EDIT_QUESTION_ANSWER,
  CANCEL_EDIT_QUESTION_ANSWER,
  UPDATE_QUESTION_ANSWER
} from '../../actions_learn';
import _ from 'lodash';

const initialState = {
  questionAnswers: []
}

export default function questionAnswer(state = initialState, action) {
  switch (action.type) {
    case SET_INCLUDED_QUESTION_ANSWERS:
      if (action.payload.included) {
        var newQuestionAnswers = action.payload.included.filter((item) => {
          return _.includes(['questionAnswers'], item.type);
        })
        let newQuestionAnswerIds = _.map(newQuestionAnswers, 'id');
        var questionAnswers = state.questionAnswers.filter((questionAnswer) => {
          return !_.includes(newQuestionAnswerIds, questionAnswer.id)
        }).concat(newQuestionAnswers)
        return { ...state, questionAnswers }
      }
    case ADD_QUESTION_ANSWER:
      var newQuestionAnswers = state.questionAnswers.filter((questionAnswer) => {
        return questionAnswer.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, questionAnswers: newQuestionAnswers }
    case REMOVE_QUESTION_ANSWER:
      var questionAnswers = state.questionAnswers.filter((questionAnswer) => {
        return questionAnswer.id !== action.payload.data.id
      });
      return { ...state, questionAnswers }
    case EDIT_QUESTION_ANSWER:
      return { ...state, editQuestionAnswer: action.payload }
    case CANCEL_EDIT_QUESTION_ANSWER:
      return { ...state, editQuestionAnswer: null }
    case UPDATE_QUESTION_ANSWER:
      var newQuestionAnswers = state.questionAnswers.filter((questionAnswer) => {
        return questionAnswer.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, questionAnswers: newQuestionAnswers }
    default:
      return state
  }
}
