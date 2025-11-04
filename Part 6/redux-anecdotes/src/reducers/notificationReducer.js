import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Thunk action creator for timed notifications (exercise 6.12)
let timeoutId = null
export const showNotification = (message, seconds) => {
  return dispatch => {
    // Clear any existing timeout to prevent multiple timers
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    dispatch(setNotification(message))
    
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer

