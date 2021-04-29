import React from 'react'

import * as db from './db'
import * as hooks from './hooks'

export const AuthApp: React.FC = () => {
  const [collection, setCollection] = React.useState<db.Collection | null>(null)

  const onClickSignOut = () => {
    db.signOut()
  }

  React.useEffect(() => {
    ;(async () => {
      const collection = await db.getCollection()

      setCollection(collection)
    })()
  }, [])

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
      <hr />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
          </tr>
        </thead>
        <tbody>
          {collection?.map((o) => (
            <tr key={o.id}>
              <td>{o.index}</td>
              <td>{o.title}</td>
              <td>{o.artist}</td>
              <td>{o.album}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
