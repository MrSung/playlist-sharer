import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export interface IPlaylistsFormState {
  title: string
  artist: string
  album: string
  comment: string
}

export type SetTitle = CaseReducer<
  IPlaylistsFormState,
  PayloadAction<{ title: string }>
>

export type SetArtist = CaseReducer<
  IPlaylistsFormState,
  PayloadAction<{ artist: string }>
>

export type SetAlbum = CaseReducer<
  IPlaylistsFormState,
  PayloadAction<{ album: string }>
>

export type SetComment = CaseReducer<
  IPlaylistsFormState,
  PayloadAction<{ comment: string }>
>

export type ResetForm = CaseReducer<IPlaylistsFormState>
