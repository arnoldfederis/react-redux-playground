import { SHOW_ALERT } from '../types/app'

export const showAlert = (payload) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload
  })
}
