import { fetchData, FETCH_REVIEWS, SET_REVIEWS, ADD_REVIEW, REMOVE_REVIEW, UPDATE_REVIEW, fetchTeachers } from '../actions';

const initialState = {
  reviews: [],
}

export default function reviews(state = initialState, action) {
  let unit
  switch (action.type) {
    case SET_REVIEWS:
      reviews = action.payload.sort((a, b) => {
        return b.attributes.created_at - a.attributes.created_at
      })
      return { ...state, reviews }
    case ADD_REVIEW:
      var newReviews = state.reviews.filter((review) => {
        return review.id !== action.payload.data.id
      });
      var reviews = newReviews.concat(action.payload.data)
      return { ...state, reviews }

    case REMOVE_REVIEW:
      reviews = state.reviews.filter((review) => {
        return review.id !== action.payload.data.id
      });
      return { ...state, reviews }

    case UPDATE_REVIEW:
      var newReviews = state.reviews.filter((review) => {
        return review.id !== action.payload.data.id
      });
      var reviews = newReviews.concat(action.payload.data)
      return { ...state, reviews }
    default:
      return state
  }
}
