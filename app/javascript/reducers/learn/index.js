import { combineReducers } from 'redux';
import CommentReducer from './comment';
import UnitReducer from './unit';
import QuestionReducer from './question';
import QuestionAnswerReducer from './question_answer';
import UserReducer from './user';
import FormsReducer from './forms';

const rootReducer = combineReducers({
  comment: CommentReducer,
  unit: UnitReducer,
  question: QuestionReducer,
  questionAnswer: QuestionAnswerReducer,
  user: UserReducer,
  forms: FormsReducer,
})

export default rootReducer;
