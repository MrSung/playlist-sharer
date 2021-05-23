import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUEo7ENYazX70RRKrExyYzS9I1p-El-VY',
  authDomain: 'learn-firebase-33b15.firebaseapp.com',
  projectId: 'learn-firebase-33b15',
  storageBucket: 'learn-firebase-33b15.appspot.com',
  messagingSenderId: '230938731096',
  appId: '1:230938731096:web:a79ed148c6fd3888fc202d',
  measurementId: 'G-Y6DZKBCB3K',
}

const firebaseApp =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()
const auth = firebaseApp.auth()
const db = firebaseApp.firestore()

export const PLAYLISTS = 'playlists'
export const SONGS = 'songs'

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider()
  await auth.signInWithPopup(provider)

  window.location.reload()
}

export type User = firebase.User | null

export const onAuthStateChanged = (
  cb: (user: User) => void
): firebase.Unsubscribe => {
  return auth.onAuthStateChanged(cb)
}

export const signOut = async (): Promise<void> => {
  await auth.signOut()

  window.location.reload()
}

interface ISong {
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

export const getPlaylists = async (): Promise<Playlists> => {
  const snapshot = await db.collection(PLAYLISTS).get()
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return data as Playlists
}

export const getPlaylistSongs = async (docId: string): Promise<ISong[]> => {
  const snapshot = await db
    .collection(PLAYLISTS)
    .doc(docId)
    .collection(SONGS)
    .get()
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return data as ISong[]
}

interface ICreatePlaylistArgs {
  item: Omit<ISong, 'id'>
  user: firebase.User
}

export const createPlaylist = async ({
  item,
  user,
}: ICreatePlaylistArgs): Promise<void> => {
  await db.collection(PLAYLISTS).add({
    ...item,
    dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
    user: {
      id: user.uid,
      username: user.displayName,
    },
  })
}

interface ICreatePlaylistSongsArgs {
  docId: string
  item: Omit<ISong, 'id'>
  user: firebase.User
}

export const createPlaylistSongs = async ({
  docId,
  item,
  user,
}: ICreatePlaylistSongsArgs): Promise<void> => {
  await db
    .collection(PLAYLISTS)
    .doc(docId)
    .collection(SONGS)
    .add({
      ...item,
      dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      user: {
        id: user.uid,
        username: user.displayName,
      },
    })
}

export const deletePlaylist = async (docId: string): Promise<void> => {
  await db.collection(PLAYLISTS).doc(docId).delete()
}
