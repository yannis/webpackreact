import { FETCH_TEACHERS, SET_TEACHERS, fetchTeachers } from '../actions';

const initialState = {
  url: '/api/teachers',
  teachers: [],
}

export default function teachers(state = initialState, action) {
  switch (action.type) {
    case SET_TEACHERS:
      let teachers = action.payload.sort((a, b) => {
        return a.attributes.last_name - b.attributes.last_name
      })
      return { ...state, teachers }
    default:
      return state
  }
}
