import { useState, useEffect } from 'react'

enum LoadingString {
  Empty = '',
  OneDot = '.',
  TwoDots = '..',
  ThreeDots = '...',
}

export const useLoading = (): string => {
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
