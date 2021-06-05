import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetUsers } from 'src/hooks'
import { Header, UsernameForm, ErrorMessage } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home = () => {
  const loggedInUser = useContext(UserContext)
  const [matchedUser, setMatchedUser] = useState<db.IUserGet | undefined>(
    undefined
  )
  const { users, error } = useGetUsers()

  useEffect(() => {
    if (loggedInUser === null || typeof users === 'undefined') {
      return
    }

    setMatchedUser(users.find((u) => u.user.id === loggedInUser.uid))
  }, [loggedInUser, users])

  return (
    <div>
      <Header />
      {(() => {
        if (error) {
          return <ErrorMessage>Failed to fetch users</ErrorMessage>
        }

        if (typeof matchedUser === 'undefined') {
          return <UsernameForm />
        }
      })()}
      <PlaylistsFormView users={users} />
    </div>
  )
}
