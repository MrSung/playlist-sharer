import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export interface ISongsFormState {
  title: string
  artist: string
  album: string
}

export type SetTitle = CaseReducer<
  ISongsFormState,
  PayloadAction<{ title: string }>
>

export type SetArtist = CaseReducer<
  ISongsFormState,
  PayloadAction<{ artist: string }>
>

export type SetAlbum = CaseReducer<
  ISongsFormState,
  PayloadAction<{ album: string }>
>

export type ResetForm = CaseReducer<ISongsFormState>
