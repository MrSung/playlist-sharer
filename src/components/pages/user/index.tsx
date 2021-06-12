import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { useGetUsers, useGetPlaylists, useLoading } from 'src/hooks'
import { Header } from 'src/components/parts'

export const User = () => {
  const { id: userId } = useParams<{ id: string }>()

  const { users, error: usersError } = useGetUsers()
  const { playlists, error: playlistsError } = useGetPlaylists()
  const loadingString = useLoading()

  return (
    <div>
      <Header />
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th>user</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            if (usersError) {
              return (
                <tr>
                  <td colSpan={5}>{usersError.message}</td>
                </tr>
              )
            }

            if (playlistsError) {
              return (
                <tr>
                  <td colSpan={5}>{playlistsError.message}</td>
                </tr>
              )
            }

            if (
              typeof users === 'undefined' ||
              typeof playlists === 'undefined'
            ) {
              return (
                <tr>
                  <td colSpan={5}>{loadingString}</td>
                </tr>
              )
            }

            return playlists
              .sort((a, b) => a.index - b.index)
              .filter((o) => o.user.id === userId)
              .map((o) => {
                const customUsername = users?.find(
                  (u) => u.user.id === o.user.id
                )?.user.customUsername

                return (
                  <Fragment key={o.id}>
                    <tr>
                      <td>{o.index}</td>
                      <td>{o.title}</td>
                      <td>{o.artist}</td>
                      <td>{o.album}</td>
                      <td>{customUsername ?? o.user.username}</td>
                    </tr>
                    <tr>
                      <td />
                      <td>comment:</td>
                      <td colSpan={3}>{o.comment}</td>
                    </tr>
                  </Fragment>
                )
              })
          })()}
        </tbody>
      </table>
    </div>
  )
}
