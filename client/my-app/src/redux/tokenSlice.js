import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: "userToken",
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    getToken: (state) => {
        return state.userToken.value;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, getToken } = tokenSlice.actions

export default tokenSlice.reducer