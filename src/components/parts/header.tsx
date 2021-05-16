import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import * as db from 'src/db'

export const Header: React.FC = () => {
  const isPlaylistItemRoute = useRouteMatch('/playlist/:id')

  return (
    <>
      <header>
        <h1>Playlist Sharer</h1>
        <p>
          Playlist Sharer is a social app that enables you to share playlists
          according to your favorite song with friends in realtime.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {isPlaylistItemRoute && <Link to='/'>&larr; Go back</Link>}
          <a
            href=''
            onClick={(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              ev.preventDefault()

              db.signOut()
            }}
            style={{ marginLeft: 'auto' }}>
            Sign Out
          </a>
        </div>
      </header>
      <hr />
    </>
  )
}
