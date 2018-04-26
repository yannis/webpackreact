import { combineReducers } from 'redux';
import UnitsReducer from './units';
import BlocksReducer from './blocks';
import ElementsReducer from './elements';
import TeachersReducer from './teachers';
import ReviewsReducer from './reviews';
import ResourcesReducer from './resources';
import FormsReducer from './forms';
import CommentReducer from './learn/comment';
import QuestionReducer from './learn/question';
import QuestionAnswerReducer from './learn/question_answer';
import UserReducer from './learn/user';

const rootReducer = combineReducers({
  blocks: BlocksReducer,
  elements: ElementsReducer,
  units: UnitsReducer,
  teachers: TeachersReducer,
  forms: FormsReducer,
  reviews: ReviewsReducer,
  resources: ResourcesReducer,
  comment: CommentReducer,
  question: QuestionReducer,
  questionAnswer: QuestionAnswerReducer,
  user: UserReducer
})

export default rootReducer;
