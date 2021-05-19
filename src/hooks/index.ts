import { useState, useEffect } from 'react'
import useSWR from 'swr'

import * as db from '../db'

enum LoadingString {
  Empty = '',
  OneDot = '.',
  TwoDots = '..',
  ThreeDots = '...',
}

type UseLoadingReturnType = string

export const useLoading = (): UseLoadingReturnType => {
  const [loadingString, setLoadingString] = useState<LoadingString>(
    LoadingString.Empty
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingString((prevStr) => {
        switch (prevStr) {
          case LoadingString.Empty:
            return LoadingString.OneDot
          case LoadingString.OneDot:
            return LoadingString.TwoDots
          case LoadingString.TwoDots:
            return LoadingString.ThreeDots
          case LoadingString.ThreeDots:
            return LoadingString.Empty
          default:
            return prevStr
        }
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return `loading ${loadingString}`.trimEnd()
}

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetPlaylists = () => {
  const { data: playlists, error } = useSWR(db.PLAYLISTS, db.getPlaylists)

  return {
    playlists,
    error,
  }
}
