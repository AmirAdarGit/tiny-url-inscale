import { configureStore } from '@reduxjs/toolkit'
import userIdReducer from './userIdSlice'

export default configureStore({
  reducer: {
      userId: userIdReducer
  },

})