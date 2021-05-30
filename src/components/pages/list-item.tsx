import React from 'react'
import { useParams } from 'react-router-dom'
import { mutate } from 'swr'

import * as db from 'src/db'
import { useLoading, useGetPlaylistSongs } from 'src/hooks'
import { Header, SongsForm } from 'src/components/parts'

export const ListItem: React.FC = () => {
  const { id: playlistId } = useParams<{ id: string }>()

  const { songs, error } = useGetPlaylistSongs(playlistId)
  const loadingString = useLoading()

  return (
    <div>
      <Header />
      <SongsForm playlistId={playlistId} />
      <p>Showing playlist id: {playlistId}</p>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th>user</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {(() => {
            if (error) {
              return (
                <tr>
                  <td colSpan={5}>{error.message}</td>
                </tr>
              )
            }

            if (typeof songs === 'undefined') {
              return (
                <tr>
                  <td colSpan={5}>{loadingString}</td>
                </tr>
              )
            }

            if (songs.length === 0) {
              return (
                <tr>
                  <td colSpan={5}>There are no songs.</td>
                </tr>
              )
            }

            return songs
              .sort((a, b) => a.index - b.index)
              .map((o) => (
                <tr key={o.id}>
                  <td>{o.index}</td>
                  <td>{o.title}</td>
                  <td>{o.artist}</td>
                  <td>{o.album}</td>
                  <td>{o.user.username}</td>
                  <td>
                    <button
                      type='button'
                      onClick={async () => {
                        await db.deletePlaylistSongs(playlistId, o.id)
                        await mutate(db.SONGS)
                      }}>
                      &times;
                    </button>
                  </td>
                </tr>
              ))
          })()}
        </tbody>
      </table>
    </div>
  )
}
