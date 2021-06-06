import { useState, useEffect } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'

import * as db from 'src/db'

export const useLoggedInUser = () => {
  // const [authUser] = useAuthState(db.auth)
  const [isLoading, setIsLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState<db.User>(null)

  useEffect(() => {
    // if (!authUser) {
    //   return
    // }

    setIsLoading(false)
    // setLoggedInUser(authUser)

    // Can be written with `onAuthStateChanged`
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
