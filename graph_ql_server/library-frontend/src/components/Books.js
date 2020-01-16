import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS } from '../gqlDocumentNodes'

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (loading) {
    return (
      <h2>...loading</h2>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      <table className="ui celled table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books