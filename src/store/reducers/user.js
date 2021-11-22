import { CREATE_USER, DELETE_USER, EDIT_USER, READ_USERS, UPDATE_USER } from '../types/user'

const initialState = {
  users: [],
  user: {}
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER:
      return state

    case READ_USERS:
      return {
        ...state,
        users: payload
      }

    case EDIT_USER:
      return { ...state, user: payload.user }

    case UPDATE_USER:
      return state

    case DELETE_USER:
      return { ...state, users: state.users.filter(({ id }) => id !== payload.uuid) }

    default:
      return state
  }
}

export default userReducer
