import { SHOW_ALERT } from '../store/types/app'

const showAlert = ({ dispatch, message, variant }) => {
  dispatch({
    type: SHOW_ALERT,
    payload: { message, showAlert: true, variant }
  })

  setTimeout(() => {
    dispatch({
      type: SHOW_ALERT,
      payload: { showAlert: false }
    })
  }, 3000)
}

export default showAlert
