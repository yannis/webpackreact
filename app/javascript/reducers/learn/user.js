import {
  SET_INCLUDED_USERS,
} from '../../actions_learn';

const initialState = {
  users: [],
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_INCLUDED_USERS:
      if (action.payload.included) {
        let newUsers = action.payload.included.filter((item) => {
          return _.includes(['teachers', 'adminusers', 'learners'], item.type);
        })
        let newUserIds = _.map(newUsers, 'id');
        var users = state.users.filter((user) => {
          return !_.includes(newUserIds, user.id)
        }).concat(newUsers)
        return { ...state, users }
      }
    default:
      return state
  }
}
