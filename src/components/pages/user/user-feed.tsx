import React from 'react'

interface IUserFeedProps {
  userId: string
}

export const UserFeed = ({ userId }: IUserFeedProps) => {
  return (
    <div>
      <h2>Showing user id: {userId}</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th>user</th>
            <th />
          </tr>
        </thead>
        <tbody>tbody</tbody>
      </table>
    </div>
  )
}
