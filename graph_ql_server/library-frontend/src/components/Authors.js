import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

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
      <h2>Authors</h2>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors