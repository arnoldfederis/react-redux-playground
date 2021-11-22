import { SHOW_ALERT } from '../types/app'

const initialState = {
  alert: {
    showAlert: false,
    variant: 'success',
    message: ''
  }
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_ALERT:
      return { ...state, alert: { ...payload } }

    default:
      return state
  }
}

export default appReducer
