import { configureStore, combineReducers } from '@reduxjs/toolkit'
import search from './Search/state'
import map, { CustomMarker } from './Map/state'

export interface RootState {
  search: {
    from: string,
    to: string
  }
  map: {
    locations: {
      items: Array<CustomMarker>
      loading: boolean
      error: string
    }
  }
}

export interface ThunkAPI {
  getState: Function
}

export function createStore () {
  // Create a store with the root reducer function being the one exposed by the manager.
  const store = configureStore({
    reducer: combineReducers({ search, map })
  })

  return store
}
