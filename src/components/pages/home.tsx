import React from 'react'
import { useHistory } from 'react-router-dom'
import { mutate } from 'swr'

import * as db from 'src/db'
import { useLoading, useGetPlaylists } from 'src/hooks'
import { Header } from 'src/components/parts/header'
import { Form } from 'src/components/parts/form'

export const Home: React.FC = () => {
  const history = useHistory()

  const { playlists, error } = useGetPlaylists()

  const loadingString = useLoading()

  return (
    <div>
      <Header />
      <Form />
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

            if (typeof playlists === 'undefined') {
              return (
                <tr>
                  <td colSpan={5}>{loadingString}</td>
                </tr>
              )
            }

            if (playlists.length === 0) {
              return (
                <tr>
                  <td colSpan={5}>There are no playlists.</td>
                </tr>
              )
            }

            return playlists
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
                        await db.deletePlaylist(o.id)
                        await mutate(db.COLLECTION_ID)
                      }}>
                      &times;
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        history.push(`/playlist/${o.id}`)
                      }}>
                      &rarr;
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
