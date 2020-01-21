import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import EditAuthors from './EditAuthor'
import { ALL_AUTHORS } from '../gqlDocumentNodes'
import { Dimmer, Loader } from 'semantic-ui-react'

const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
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
      <EditAuthors authors={data.allAuthors}/>
    </div>
  )
}

export default Authors