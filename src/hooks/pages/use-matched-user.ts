import { useContext, useState, useEffect } from 'react'

import { UserContext } from 'src/app'
import * as db from 'src/db'
import { useGetUsers } from 'src/hooks'

export const useMatchedUser = () => {
  const loggedInUser = useContext(UserContext)
  const [matchedUser, setMatchedUser] = useState<
    db.IUserGet | undefined | null
  >(null)
  const { users } = useGetUsers()

  useEffect(() => {
    if (loggedInUser === null || typeof users === 'undefined') {
      return
    }

    setMatchedUser(users.find((u) => u.user.id === loggedInUser.uid))
  }, [loggedInUser, users])

  return matchedUser
}
