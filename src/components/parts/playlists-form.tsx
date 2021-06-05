import React, { useContext } from 'react'
import { mutate } from 'swr'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetPlaylists } from 'src/hooks'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import {
  playlistsFormSelector,
  actions,
  isPlaylistsFormNotFilledSelector,
} from 'src/features/playlists-form/playlists-form-slice'

export const PlaylistsForm = () => {
  const loggedInUser = useContext(UserContext)
  const dispatch = useAppDispatch()
  const playlistsForm = useAppSelector(playlistsFormSelector)
  const isPlaylistsFormNotFilled = useAppSelector(
    isPlaylistsFormNotFilledSelector
  )

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
            value={playlistsForm.title}
            onChange={(ev) => {
              dispatch(actions.setTitle(ev.target.value))
            }}
          />
        </label>
        <label>
          <span>Artist: </span>
          <input
            type='text'
            name='artist'
            value={playlistsForm.artist}
            onChange={(ev) => {
              dispatch(actions.setArtist(ev.target.value))
            }}
          />
        </label>
        <label>
          <span>Album: </span>
          <input
            type='text'
            name='album'
            value={playlistsForm.album}
            onChange={(ev) => {
              dispatch(actions.setAlbum(ev.target.value))
            }}
          />
        </label>
        <button
          type='button'
          onClick={async () => {
            if (typeof playlists === 'undefined' || loggedInUser === null) {
              return
            }

            await db.createPlaylist({
              user: loggedInUser,
              item: {
                index: playlists.length,
                album: playlistsForm.album,
                artist: playlistsForm.artist,
                title: playlistsForm.title,
              },
            })
            await mutate(db.PLAYLISTS)

            dispatch(actions.resetForm())
          }}
          disabled={isPlaylistsFormNotFilled}
          style={{ marginBottom: '10px' }}>
          Add song
        </button>
      </form>
      <hr />
    </>
  )
}
