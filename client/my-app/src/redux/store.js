import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
import userIdReducer from './userIdSlice'

export default configureStore({
  reducer: {
      userToken: tokenReducer,
      userId: userIdReducer
  },

})