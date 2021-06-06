import React, { useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { UserContext } from 'src/app'
import * as db from 'src/db'

export const Header = () => {
  const isPlaylistItemRoute = useRouteMatch('/playlist/:id')
  const loggedInUser = useContext(UserContext)

  return (
    <>
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px',
          columnGap: '10px',
        }}>
        <h1 style={{ gridRow: '1 / 2', gridColumn: '1 / 2' }}>
          Playlist Sharer
        </h1>
        {loggedInUser !== null && (
          <span
            style={{
              gridRow: '1 / 2',
              gridColumn: '2 / 3',
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}>
            <img
              src={loggedInUser.photoURL ?? 'https://via.placeholder.com/96'}
              alt=''
              width='96'
              height='96'
            />
          </span>
        )}
        <p style={{ gridRow: '2 / 3', gridColumn: '1 / 2' }}>
          Playlist Sharer is a social app that enables you to share playlists
          according to your favorite song with friends in realtime.
        </p>
        {isPlaylistItemRoute && (
          <span
            style={{
              gridRow: '3 / 4',
              gridColumn: '1 / 2',
            }}>
            <Link to='/'>&larr; Go back</Link>
          </span>
        )}
        <div
          style={{
            gridRow: '3 / 4',
            gridColumn: '2 / 3',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <a
            href=''
            onClick={(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              ev.preventDefault()

              db.signOut()
            }}>
            Sign Out
          </a>
        </div>
      </header>
      <hr />
    </>
  )
}
