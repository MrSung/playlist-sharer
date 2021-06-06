import React, { useContext } from 'react'
import { mutate } from 'swr'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetPlaylistSongs } from 'src/hooks'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import {
  songsFormSelector,
  actions,
  isSongsFormNotFilledSelector,
} from 'src/features/songs-form/songs-form-slice'

interface ISongsFormProps {
  playlistId: string
}

export const SongsForm = ({ playlistId }: ISongsFormProps) => {
  const loggedInUser = useContext(UserContext)

  const dispatch = useAppDispatch()
  const songsForm = useAppSelector(songsFormSelector)
  const isSongsFormNotFilled = useAppSelector(isSongsFormNotFilledSelector)

  const { songs } = useGetPlaylistSongs(playlistId)

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
            value={songsForm.title}
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
            value={songsForm.artist}
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
            value={songsForm.album}
            onChange={(ev) => {
              dispatch(actions.setAlbum(ev.target.value))
            }}
          />
        </label>
        <button
          type='button'
          onClick={async () => {
            if (typeof songs === 'undefined' || loggedInUser === null) {
              return
            }

            await db.createPlaylistSongs({
              docId: playlistId,
              user: loggedInUser,
              item: {
                index: songs.length,
                album: songsForm.album,
                artist: songsForm.artist,
                title: songsForm.title,
              },
            })
            await mutate(db.SONGS)

            dispatch(actions.resetForm())
          }}
          disabled={isSongsFormNotFilled}
          style={{ marginBottom: '10px' }}>
          Add song
        </button>
      </form>
      <hr />
    </>
  )
}
