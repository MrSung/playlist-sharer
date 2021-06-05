import React from 'react'
import { useParams } from 'react-router-dom'

import { Header } from 'src/components/parts'
import { SongsFormView } from './songs-form-view'

export const List = () => {
  const { id: playlistId } = useParams<{ id: string }>()

  return (
    <div>
      <Header />
      <SongsFormView playlistId={playlistId} />
    </div>
  )
}
