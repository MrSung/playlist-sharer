import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from 'src/app'
import { IUserGet } from 'src/db'
import { useGetUsers } from 'src/hooks'
import { Header, UsernameForm } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home: React.FC = () => {
  const user = useContext(UserContext)
  const [matchedUser, setMatchedUser] = useState<IUserGet | undefined>(
    undefined
  )
  const { users, error } = useGetUsers()

  useEffect(() => {
    if (user === null || typeof users === 'undefined') {
      return
    }

    const usr = users.find((u) => u.user.id === user.uid)
    setMatchedUser(usr)
  }, [user, users])

  return (
    <div>
      <Header />
      {error && <p>Failed to fetch users</p>}
      {typeof matchedUser === 'undefined' ? (
        <UsernameForm />
      ) : (
        <PlaylistsFormView />
      )}
    </div>
  )
}
