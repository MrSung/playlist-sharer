import React, { createContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, List, User } from 'src/components/pages'
import * as db from 'src/db'
import * as hooks from 'src/hooks'

export const AuthApp = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/playlist/:id' component={List} />
      <Route path='/user/:id' component={User} />
    </Switch>
  </BrowserRouter>
)

export const UnAuthApp = () => {
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

export const App = () => {
  const { isLoading, loggedInUser } = hooks.useLoggedInUser()
  const loadingString = hooks.useLoading()

  if (isLoading) {
    return <div>{loadingString}</div>
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      {loggedInUser === null ? <UnAuthApp /> : <AuthApp />}
    </UserContext.Provider>
  )
}
