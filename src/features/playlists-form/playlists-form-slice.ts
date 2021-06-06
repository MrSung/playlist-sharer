import { createSlice, createSelector } from '@reduxjs/toolkit'

import { RootState } from 'src/app/store'
import * as pfType from './type'

const initialState: pfType.IPlaylistsFormState = {
  title: '',
  artist: '',
  album: '',
  comment: '',
}

const setTitle: pfType.SetTitle = (state, action) => {
  state.title = action.payload.title
}

const setArtist: pfType.SetArtist = (state, action) => {
  state.artist = action.payload.artist
}

const setAlbum: pfType.SetAlbum = (state, action) => {
  state.album = action.payload.album
}

const setComment: pfType.SetComment = (state, action) => {
  state.comment = action.payload.comment
}

const resetForm: pfType.ResetForm = (state) => {
  state.title = ''
  state.artist = ''
  state.album = ''
  state.comment = ''
}

export const playlistsFormSlice = createSlice({
  name: 'playlists-form',
  initialState,
  reducers: {
    setTitle,
    setArtist,
    setAlbum,
    setComment,
    resetForm,
  },
})

export const { actions, reducer } = playlistsFormSlice

export const playlistsFormSelector = (state: RootState) => state.playlistsForm

export const isPlaylistsFormNotFilledSelector = createSelector(
  playlistsFormSelector,
  (state) => state.title === '' || state.artist === '' || state.album === ''
)
