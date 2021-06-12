import React from 'react'

import { useGetUsers } from 'src/hooks'
import { Header, UsernameForm, ErrorMessage } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home = () => {
  const { users, error } = useGetUsers()

  return (
    <div>
      <Header />
      {error ? (
        <ErrorMessage>Failed to fetch users</ErrorMessage>
      ) : (
        <UsernameForm />
      )}
      <PlaylistsFormView users={users} />
    </div>
  )
}
