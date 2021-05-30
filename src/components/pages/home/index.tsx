import React from 'react'

import { Header, UsernameForm } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home: React.FC = () => (
  <div>
    <Header />
    <UsernameForm />
    <PlaylistsFormView />
  </div>
)
