import { createSlice, combineReducers } from '@reduxjs/toolkit'
import {format, parse, add} from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

const parseToString = (date: string): string => format(
  parse(date, DATE_FORMAT, new Date()),
  DATE_FORMAT
)

const from = createSlice({
  name: 'search/from',
  initialState: format(new Date(), DATE_FORMAT),
  reducers: {
    set: (state, action) => parseToString(action.payload),
  }
})

export const fromActions = from.actions

export const to = createSlice({
  name: 'search/to',
  initialState: format(add(new Date(), { months: 3 }), DATE_FORMAT),
  reducers: {
    set: (state, action) => parseToString(action.payload),
  }
})

export const toActions = from.actions

export default combineReducers({
  from: from.reducer,
  to: to.reducer,
})
