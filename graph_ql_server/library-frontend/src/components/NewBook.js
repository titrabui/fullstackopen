import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button, Label, Icon, Message } from 'semantic-ui-react'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      genres
      id
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (errors) => {
    // setErrorMessage(errors.graphQLErrors[0].message)
    setErrorMessage('What the fuck?')
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(CREATE_BOOK,  {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    addBook({
      variables: {
        title: title,
        author: author,
        published: Number(published),
        genres: genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {errorMessage && <Message
        error
        header='Create Book Failed'
        content={errorMessage}
      />}
      <Form>
        <Form.Field>
          <label>Title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Published</label>
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Genre</label>
          <Form.Group>
            <Form.Input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <Form.Button onClick={addGenre} content='Add genre'/>
          </Form.Group>
        </Form.Field>
        {genres.length > 0 &&
        <Form.Field>
          <label>Genres</label>
          {genres.map(g =>
            <Label key={g} as='a'>
              {g}
              <Icon name='delete' />
            </Label>
          )}
        </Form.Field>}
        <Form.Field>
          <Button onClick={submit}>Save</Button>
        </Form.Field>
      </Form>
    </div>
  )
}

export default NewBook