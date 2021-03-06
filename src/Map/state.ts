import { createSlice, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from 'whatwg-fetch'
import URI from 'urijs'
import { checkStatus, parseJSON } from '../utils'
import { RootState, ThunkAPI, DATE_FORMAT } from '../store'
import { getDefaultFrom, getDefaultTo } from '../Search/state'
import { format } from 'date-fns'

enum StatusMap {
  // (1 Green, 2 Red, 3 Success, 4 Failed)
  GREEN = 1,
  RED = 2,
  SUCCESS = 3,
  FAILED = 4
}

export interface CustomMarker {
  name: string;
  coordinates: [number, number]
  status: StatusMap
  first: boolean,
  date: string | null,
  agencies: [{ id: number, name: string }]
}

export interface Launch {
  id: number;
  name: string;
  coordinates: [number, number]
  status: number, // (1 Green, 2 Red, 3 Success, 4 Failed)
  net: string,
  location: {
    pads: [
      {
        agencies: [
          {
            id: number,
            name: string
          }
        ],
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
      URI(`https://launchlibrary.net/1.3/launch/${from || getDefaultFrom()}/${to || getDefaultTo()}`),
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

      const firstLaunch = action.payload.launches[0] ? action.payload.launches[0].id : null
      // Add payload to the state array
      state.items = action.payload.launches.map((launch: Launch) => {
        const id = launch.id
        return {
          id,
          name: launch.name,
          first: firstLaunch === id,
          status: StatusMap[launch.status], // (1 Green, 2 Red, 3 Success, 4 Failed)
          date: launch.net,
          agencies: (launch.location.pads[0].agencies || []).map(({ id, name }) => ({ id, name })),
          coordinates: [launch.location.pads[0].latitude, launch.location.pads[0].longitude]
        }
      })
    }
  }
})


export default combineReducers({
  locations: slice.reducer
})
