import firebase from 'firebase/app'

export type User = firebase.User | null

export interface ISong {
  album: string
  artist: string
  // dateAdded: {
  //   nanoseconds: number
  //   seconds: number
  // }
  id: string
  index: number
  title: string
}

export type Playlists = ISong[]

export interface ICreatePlaylistArgs {
  item: Omit<ISong, 'id'>
  user: firebase.User
}

export interface ICreatePlaylistSongsArgs {
  docId: string
  item: Omit<ISong, 'id'>
  user: firebase.User
}
