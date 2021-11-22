import { CREATE_POST, DELETE_POST, EDIT_POST, READ_POSTS, UPDATE_POST } from '../types/post'

const initialState = {
  posts: [],
  post: {}
}

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      }

    case READ_POSTS:
      return {
        ...state,
        posts: payload
      }

    case EDIT_POST:
      return {
        ...state,
        post: payload
      }

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post.id === payload.id ? payload : post)
      }

    case DELETE_POST:
      return { ...state, posts: state.posts.filter(({ id }) => id !== payload) }

    default:
      return state
  }
}

export default postReducer
