import React from 'react'
import { useParams } from 'react-router-dom'

import { Header, Form } from 'src/components/parts'

export const ListItem: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <Header />
      <Form />
      <p>Showing playlist id: {id}</p>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>artist</th>
            <th>album</th>
            <th />
          </tr>
        </thead>
      </table>
    </div>
  )
}
