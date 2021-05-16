import React, { useContext, useReducer } from 'react'
import { mutate } from 'swr'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetPlaylists } from 'src/hooks'

interface IInitialFormState {
  title: string
  artist: string
  album: string
}

const initialFormState: IInitialFormState = {
  artist: '',
  title: '',
  album: '',
}

enum ActionType {
  SET_TITLE = 'SET_TITLE',
  SET_ARTIST = 'SET_ARTIST',
  SET_ALBUM = 'SET_ALBUM',
  RESET_ITEM = 'RESET_ITEM',
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

interface IResetItem {
  type: ActionType.RESET_ITEM
}

type Action = ISetTitle | ISetArtist | ISetAlbum | IResetItem

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
    case ActionType.RESET_ITEM:
      return {
        ...state,
        title: '',
        artist: '',
        album: '',
      }
    default:
      throw new Error()
  }
}

export const Form: React.FC = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState)
  const user = useContext(UserContext)

  const { playlists } = useGetPlaylists()

  return (
    <>
      <form
        autoComplete='off'
        onSubmit={() => false}
        style={{ display: 'flex', alignItems: 'flex-end' }}>
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
        <button
          type='button'
          onClick={async () => {
            if (typeof playlists === 'undefined' || user === null) {
              return
            }

            await db.createPlaylist({
              user,
              item: {
                index: playlists.length,
                album: formState.album,
                artist: formState.artist,
                title: formState.title,
                songs: [],
              },
            })
            await mutate(db.COLLECTION_ID)

            dispatch({
              type: ActionType.RESET_ITEM,
            })
          }}
          style={{ marginBottom: '10px' }}>
          Add song
        </button>
      </form>
      <hr />
    </>
  )
}
