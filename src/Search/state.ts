import { createSlice, combineReducers } from '@reduxjs/toolkit'

export const dates = createSlice({
  name: 'search/dates',
  initialState: false,
  reducers: {
    set: (state, action) => action.payload,
  }
})

export default combineReducers({
  dates: dates.reducer,
})
