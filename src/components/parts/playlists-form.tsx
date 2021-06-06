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
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 200px 200px 1fr',
          columnGap: '10px',
        }}>
        <label style={{ gridRow: '1 / 2', gridColumn: '1 / 2' }}>
          <span>Title: </span>
          <input
            type='text'
            name='title'
            value={playlistsForm.title}
            onChange={(ev) => {
              dispatch(actions.setTitle({ title: ev.target.value }))
            }}
            style={{ width: '100%', margin: '0' }}
          />
        </label>
        <label style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }}>
          <span>Artist: </span>
          <input
            type='text'
            name='artist'
            value={playlistsForm.artist}
            onChange={(ev) => {
              dispatch(actions.setArtist({ artist: ev.target.value }))
            }}
            style={{ width: '100%', margin: '0' }}
          />
        </label>
        <label style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }}>
          <span>Album: </span>
          <input
            type='text'
            name='album'
            value={playlistsForm.album}
            onChange={(ev) => {
              dispatch(actions.setAlbum({ album: ev.target.value }))
            }}
            style={{ width: '100%', margin: '0' }}
          />
        </label>
        <label style={{ gridRow: '2 / 3', gridColumn: '1 / 4' }}>
          <span>Comment: </span>
          <textarea
            name='comment'
            value={playlistsForm.comment}
            onChange={(ev) => {
              dispatch(actions.setComment({ comment: ev.target.value }))
            }}
            cols={30}
            rows={2}
            style={{ width: '100%' }}></textarea>
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gridRow: '1 / 3',
            gridColumn: '4 / 5',
          }}>
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
                  comment: playlistsForm.comment,
                },
              })
              await mutate(db.PLAYLISTS)

              dispatch(actions.resetForm())
            }}
            disabled={isPlaylistsFormNotFilled}
            style={{ height: '108px', margin: '0' }}>
            Add song
          </button>
        </div>
      </form>
      <hr />
    </>
  )
}
