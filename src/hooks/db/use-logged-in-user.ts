import { useState, useEffect } from 'react'

import * as db from 'src/db'

export const useLoggedInUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState<db.User>(null)

  useEffect(() => {
    db.onAuthStateChanged((loggedInUser) => {
      setIsLoading(false)
      setLoggedInUser(loggedInUser)
    })
  }, [])

  return {
    isLoading,
    loggedInUser,
  }
}
