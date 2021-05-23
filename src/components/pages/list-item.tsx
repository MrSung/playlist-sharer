import React from 'react'
import { useParams } from 'react-router-dom'

import { useLoading, useGetPlaylistSongs } from 'src/hooks'
import { Header, SongsForm } from 'src/components/parts'

export const ListItem: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { songs, error } = useGetPlaylistSongs(id)
  const loadingString = useLoading()

  return (
    <div>
      <Header />
      <SongsForm playlistId={id} />
      <p>Showing playlist id: {id}</p>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
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
                  <td>
                    <button
                      type='button'
                      onClick={async () => {
                        // TODO: delete song
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
