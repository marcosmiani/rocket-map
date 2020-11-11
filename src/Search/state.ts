import { createSlice, combineReducers } from '@reduxjs/toolkit'
import {format, parse, add} from 'date-fns';
import { DATE_FORMAT } from '../store'

const parseToString = (date: string): string => format(
  parse(date, DATE_FORMAT, new Date()),
  DATE_FORMAT
)

export const getDefaultFrom = () => format(new Date(), DATE_FORMAT)
export const getDefaultTo = () => format(add(new Date(), { months: 3 }), DATE_FORMAT)

const from = createSlice({
  name: 'search/from',
  initialState: '',
  reducers: {
    set: (state, action) => parseToString(action.payload),
  }
})

export const fromActions = from.actions

export const to = createSlice({
  name: 'search/to',
  initialState: '',
  reducers: {
    set: (state, action) => parseToString(action.payload),
  }
})

export const toActions = from.actions

export default combineReducers({
  from: from.reducer,
  to: to.reducer,
})
