import React, { useReducer, useState } from 'react'

import * as db from './db'
import * as hooks from './hooks'

interface IInitialFormState {
  title: string
  artist: string
  album: string
}

const initialFormState: IInitialFormState = {
  title: '',
  artist: '',
  album: '',
}

enum ActionType {
  SET_TITLE = 'SET_TITLE',
  SET_ARTIST = 'SET_ARTIST',
  SET_ALBUM = 'SET_ALBUM',
}

interface ISetTitle {
  type: ActionType.SET_TITLE
  payload: {
    title: IInitialFormState['title']
  }
}

interface ISetArtist {
  type: ActionType.SET_ARTIST
  payload: {
    artist: IInitialFormState['artist']
  }
}

interface ISetAlbum {
  type: ActionType.SET_ALBUM
  payload: {
    album: IInitialFormState['album']
  }
}

type Action = ISetTitle | ISetArtist | ISetAlbum

const reducer: React.Reducer<IInitialFormState, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
      }
    case ActionType.SET_ARTIST:
      return {
        ...state,
        artist: action.payload.artist,
      }
    case ActionType.SET_ALBUM:
      return {
        ...state,
        album: action.payload.album,
      }
    default:
      throw new Error()
  }
}

export const AuthApp: React.FC = () => {
  const [collection, setCollection] = useState<db.Collection | null>(null)
  const [formState, dispatch] = useReducer(reducer, initialFormState)

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
      <button type='button' onClick={onClickSignOut}>
        Sign Out
      </button>
      <hr />
      <form autoComplete='off' style={{ display: 'flex', alignItems: 'flex-end' }}>
        <label>
          <span>Title: </span>
          <input
            type='text'
            name='title'
            value={formState.title}
            onChange={(ev) => {
              dispatch({
                type: ActionType.SET_TITLE,
                payload: { title: ev.target.value },
              })
            }}
          />
        </label>
        <label>
          <span>Artist: </span>
          <input
            type='text'
            name='artist'
            value={formState.artist}
            onChange={(ev) => {
              dispatch({
                type: ActionType.SET_ARTIST,
                payload: { artist: ev.target.value },
              })
            }}
          />
        </label>
        <label>
          <span>Album: </span>
          <input
            type='text'
            name='album'
            value={formState.album}
            onChange={(ev) => {
              dispatch({
                type: ActionType.SET_ALBUM,
                payload: { album: ev.target.value },
              })
            }}
          />
        </label>
        <button type='submit' style={{ marginBottom: '10px' }}>Add song</button>
      </form>
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
      <button type='button' onClick={onClickSignInWithGoogle}>
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
