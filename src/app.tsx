import React, { createContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './components/pages'
import * as db from './db'
import * as hooks from './hooks'

export const AuthApp: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </BrowserRouter>
)

export const UnAuthApp: React.FC = () => {
  const onClickSignInWithGoogle = () => {
    db.signInWithGoogle()
  }

  return (
    <div>
      <p>You are signed out.</p>
      <button type='button' onClick={onClickSignInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}

export const UserContext = createContext<db.User>(null)

export const App: React.FC = () => {
  const { isLoading, user } = hooks.useUser()
  const loadingString = hooks.useLoading()

  if (isLoading) {
    return <div>{loadingString}</div>
  }

  return (
    <UserContext.Provider value={user}>
      {user === null ? <UnAuthApp /> : <AuthApp />}
    </UserContext.Provider>
  )
}
