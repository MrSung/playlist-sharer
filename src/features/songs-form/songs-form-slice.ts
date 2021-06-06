import { createSlice, createSelector } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'
import * as sfType from './type'

const initialState: sfType.ISongsFormState = {
  title: '',
  artist: '',
  album: '',
}

const setTitle: sfType.SetTitle = (state, action) => {
  state.title = action.payload.title
}

const setArtist: sfType.SetArtist = (state, action) => {
  state.artist = action.payload.artist
}

const setAlbum: sfType.SetAlbum = (state, action) => {
  state.album = action.payload.album
}

const resetForm: sfType.ResetForm = (state) => {
  state.title = ''
  state.artist = ''
  state.album = ''
}

export const songsFormSlice = createSlice({
  name: 'songs-form',
  initialState,
  reducers: {
    setTitle,
    setArtist,
    setAlbum,
    resetForm,
  },
})

export const { actions, reducer } = songsFormSlice

export const songsFormSelector = (state: RootState) => state.songsForm

export const isSongsFormNotFilledSelector = createSelector(
  songsFormSelector,
  (state) => state.title === '' || state.artist === '' || state.album === ''
)
