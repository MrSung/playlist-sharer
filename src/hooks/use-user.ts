import { useState, useEffect } from 'react'

import * as db from 'src/db'

interface IUseUserReturnType {
  isLoading: boolean
  user: db.User
}

export const useUser = (): IUseUserReturnType => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<db.User>(null)

  useEffect(() => {
    db.onAuthStateChanged((user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  return {
    isLoading,
    user,
  }
}
