import React from 'react'

import * as db from './db'
import * as hooks from './hooks'

export const AuthApp: React.FC = () => {
  const onClickSignOut = () => {
    db.signOut()
  }

  return (
    <div>
      <h1>Playlist Sharer</h1>
      <p>
        Playlist Sharer is a social app that enables you to share your playlist
        with friends in realtime.
      </p>
      <button type="button" onClick={onClickSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export const UnAuthApp: React.FC = () => {
  const onClickSignInWithGoogle = () => {
    db.signInWithGoogle()
  }

  return (
    <div>
      <p>You are signed out.</p>
      <button type="button" onClick={onClickSignInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}

export const App: React.FC = () => {
  const { isLoading, user } = hooks.useUser()
  const loadingString = hooks.useLoading()

  if (isLoading) {
    return <div>{loadingString}</div>
  }

  return <div>{user === null ? <UnAuthApp /> : <AuthApp />}</div>
}
