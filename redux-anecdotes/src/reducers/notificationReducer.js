const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, timeout=5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
