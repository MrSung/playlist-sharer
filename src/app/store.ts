import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { reducer as playlistsFormReducer } from 'src/features/playlists-form/playlists-form-slice'
import { reducer as songsFormReducer } from 'src/features/songs-form/songs-form-slice'

export const store = configureStore({
  reducer: {
    playlistsForm: playlistsFormReducer,
    songsForm: songsFormReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
