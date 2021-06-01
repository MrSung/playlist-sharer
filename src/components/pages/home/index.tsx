import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetUsers } from 'src/hooks'
import { Header, UsernameForm } from 'src/components/parts'
import { PlaylistsFormView } from './playlists-form-view'

export const Home: React.FC = () => {
  const user = useContext(UserContext)
  const [matchedUser, setMatchedUser] = useState<db.IUserGet | undefined>(
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
      {(() => {
        if (error) {
          return <p>Failed to fetch users</p>
        }

        if (typeof matchedUser === 'undefined') {
          return <UsernameForm />
        }

        return <PlaylistsFormView users={users} />
      })()}
    </div>
  )
}
