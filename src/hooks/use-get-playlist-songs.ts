import useSWR from 'swr'

import * as db from '../db'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetPlaylistSongs = (docId: string) => {
  const { data: songs, error } = useSWR(db.SONGS, () =>
    db.getPlaylistSongs(docId)
  )

  return {
    songs,
    error,
  }
}
