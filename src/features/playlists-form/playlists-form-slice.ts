import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'

export interface IPlaylistsFormState {
  title: string
  artist: string
  album: string
  comment: string
}

const initialState: IPlaylistsFormState = {
  title: '',
  artist: '',
  album: '',
  comment: '',
}

export const playlistsFormSlice = createSlice({
  name: 'playlists-form',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload
    },
    setAlbum: (state, action: PayloadAction<string>) => {
      state.album = action.payload
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload
    },
    resetForm: (state) => {
      state.title = ''
      state.artist = ''
      state.album = ''
      state.comment = ''
    },
  },
})

export const { actions, reducer } = playlistsFormSlice

export const playlistsFormSelector = (state: RootState) => state.playlistsForm

export const isPlaylistsFormNotFilledSelector = createSelector(
  playlistsFormSelector,
  (state) => state.title === '' || state.artist === '' || state.album === ''
)
