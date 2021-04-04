import { createSlice } from '@reduxjs/toolkit'

export const userIdSlice = createSlice({
  name: "userId",
  initialState: {
    value: ''
  },
  reducers: {
    setId: (state, action) => {
      state.value = action.payload;
    },
    getId: (state) => {
        return state.userId.value;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setId, getId } = userIdSlice.actions

export default userIdSlice.reducer