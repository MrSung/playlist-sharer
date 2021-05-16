import React from 'react'

import * as db from 'src/db'

export const Header: React.FC = () => (
  <>
    <header>
      <h1>Playlist Sharer</h1>
      <p>
        Playlist Sharer is a social app that enables you to share playlists
        according to your favorite song with friends in realtime.
      </p>
      <div style={{ textAlign: 'right' }}>
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
