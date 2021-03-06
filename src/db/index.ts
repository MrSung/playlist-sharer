import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import * as dbType from './type'

export * from './type'

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
export const auth = firebaseApp.auth()
export const firestore = firebaseApp.firestore()

export const USERS = 'users'
export const PLAYLISTS = 'playlists'
export const SONGS = 'songs'

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider()
  await auth.signInWithPopup(provider)

  window.location.reload()
}

// Can be written with `useAuthState`
export const onAuthStateChanged = (
  cb: (user: dbType.User) => void
): firebase.Unsubscribe => {
  return auth.onAuthStateChanged(cb)
}

export const signOut = async (): Promise<void> => {
  await auth.signOut()

  window.location.reload()
}

export const getUsers = async (): Promise<dbType.IUserGet[]> => {
  const snapshot = await firestore.collection(USERS).get()
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  return data as dbType.IUserGet[]
}

export const getPlaylists = async (): Promise<dbType.Playlists> => {
  const snapshot = await firestore.collection(PLAYLISTS).get()
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  return data as dbType.Playlists
}

export const getPlaylistSongs = async (
  docId: string
): Promise<dbType.Playlists> => {
  const snapshot = await firestore
    .collection(PLAYLISTS)
    .doc(docId)
    .collection(SONGS)
    .get()
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  return data as dbType.Playlists
}

export const createCustomUser = async ({
  user,
  customUsername,
}: dbType.ICreateCustomUserArgs): Promise<void> => {
  await firestore.collection(USERS).add({
    dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
    user: {
      id: user.uid,
      username: user.displayName,
      customUsername,
    },
  })
}

export const createPlaylist = async ({
  item,
  user,
}: dbType.ICreatePlaylistArgs): Promise<void> => {
  await firestore.collection(PLAYLISTS).add({
    ...item,
    dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
    user: {
      id: user.uid,
      username: user.displayName,
    },
  })
}

export const createPlaylistSongs = async ({
  docId,
  item,
  user,
}: dbType.ICreatePlaylistSongsArgs): Promise<void> => {
  await firestore
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

export const deleteCustomUser = async (docId: string): Promise<void> => {
  await firestore.collection(USERS).doc(docId).delete()
}

export const deletePlaylist = async (docId: string): Promise<void> => {
  await firestore.collection(PLAYLISTS).doc(docId).delete()
}

export const deletePlaylistSongs = async (
  docId: string,
  songId: string
): Promise<void> => {
  await firestore
    .collection(PLAYLISTS)
    .doc(docId)
    .collection(SONGS)
    .doc(songId)
    .delete()
}
