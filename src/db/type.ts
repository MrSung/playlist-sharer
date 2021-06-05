import firebase from 'firebase/app'

export type User = firebase.User | null

export interface IUser {
  customUsername: string
  id: string
  username: string
}

export type Users = IUser[]

export interface IUserGet {
  // dateAdded: {
  //   nanoseconds: number
  //   seconds: number
  // }
  id: string
  user: IUser
}

export interface ISongGet {
  album: string
  artist: string
  // dateAdded: {
  //   nanoseconds: number
  //   seconds: number
  // }
  id: string
  index: number
  title: string
  user: {
    id: string
    username: string
  }
}

export type Playlists = ISongGet[]

export interface ISongPost {
  album: string
  artist: string
  index: number
  title: string
}

export interface ICreateCustomUserArgs {
  user: firebase.User
  customUsername: string
}

export interface ICreatePlaylistArgs {
  item: ISongPost
  user: firebase.User
}

export interface ICreatePlaylistSongsArgs {
  docId: string
  item: ISongPost
  user: firebase.User
}
