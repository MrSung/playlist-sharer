import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPlaylistsFormState {
  title: string
  artist: string
  album: string
}

const initialState: IPlaylistsFormState = {
  title: '',
  artist: '',
  album: '',
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
    resetForm: (state) => {
      state.title = ''
      state.artist = ''
      state.album = ''
    },
  },
})

export const { actions, reducer } = playlistsFormSlice
