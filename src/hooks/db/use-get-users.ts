import useSWR from 'swr'

import * as db from 'src/db'

export const useGetUsers = () => {
  const { data: users, error } = useSWR(db.USERS, db.getUsers)

  return {
    users,
    error,
  }
}
