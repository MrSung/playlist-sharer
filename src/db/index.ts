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
