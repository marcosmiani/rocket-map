import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import URI from 'urijs'
import { checkStatus, parseJSON } from '../utils'
import { RootState, ThunkAPI } from '../store'

export interface CustomMarker {
  name: string;
  coordinates: [number, number]
}

export interface Launch {
  name: string;
  coordinates: [number, number]
  location: {
    pads: [
      {
        latitude: number,
        longitude: number,
      }
    ]
  }
}

// SEARCH
export const searchLaunches: any = createAsyncThunk(
  `map/locations_by_date`,
  async (params, thunkAPI: ThunkAPI) => {
    const state: RootState = thunkAPI.getState()
    const { search: { from, to } } = state

    return fetch(
      URI(`https://launchlibrary.net/1.3/launch/${from}/${to}`),
      {
        method: 'GET'
      }
    )
      .then(checkStatus)
      .then(parseJSON)
  })

const slice =  createSlice({
  name: `map_locations`,
  initialState: { items: [], loading: false, error: '' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [searchLaunches.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = false
      state.error = `${action.payload}`
    },
    [searchLaunches.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true
      state.error = ''
    },
    [searchLaunches.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      // Add payload to the state array
      state.items = action.payload.launches.map((launch: Launch) => {
        return {
          markerOffset: -15,
          name: launch.name,
          coordinates: [launch.location.pads[0].latitude, launch.location.pads[0].longitude]
        }
      })
    }
  }
})


export default combineReducers({
  locations: slice.reducer
})
