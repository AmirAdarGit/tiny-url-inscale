import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userIdState {
  value: string
}

const initialState: userIdState = {
  value: ''
}

export const userIdSlice = createSlice({
  name: "userId",
  initialState,
  
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setId } = userIdSlice.actions

export default userIdSlice.reducer