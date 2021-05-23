import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'

export interface ISongsFormState {
  title: string
  artist: string
  album: string
}

const initialState: ISongsFormState = {
  title: '',
  artist: '',
  album: '',
}

export const songsFormSlice = createSlice({
  name: 'songs-form',
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
    resetForm: (state) => {
      state.title = ''
      state.artist = ''
      state.album = ''
    },
  },
})

export const { actions, reducer } = songsFormSlice

export const songsFormSelector = (state: RootState) => state.songsForm
