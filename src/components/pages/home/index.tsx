import React from 'react'

import { Header } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home: React.FC = () => (
  <div>
    <Header />
    <PlaylistsFormView />
  </div>
)
