import useSWR from 'swr'

import * as db from 'src/db'

export const useGetPlaylists = () => {
  const { data: playlists, error } = useSWR(db.PLAYLISTS, db.getPlaylists)

  return {
    playlists,
    error,
  }
}
