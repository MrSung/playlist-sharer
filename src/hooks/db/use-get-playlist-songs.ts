import useSWR from 'swr'

import * as db from 'src/db'

export const useGetPlaylistSongs = (docId: string) => {
  const { data: songs, error } = useSWR(db.SONGS, () =>
    db.getPlaylistSongs(docId)
  )

  return {
    songs,
    error,
  }
}
