import useSWR from 'swr'

import * as db from '../db'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetPlaylists = () => {
  const { data: playlists, error } = useSWR(db.PLAYLISTS, db.getPlaylists)

  return {
    playlists,
    error,
  }
}
