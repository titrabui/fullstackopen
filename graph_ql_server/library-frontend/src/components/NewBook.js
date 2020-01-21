import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button, Label, Icon, Message } from 'semantic-ui-react'
import { ALL_BOOKS, CREATE_BOOK } from '../gqlDocumentNodes'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [headerMessage, setHeaderMessage] = useState(null)

  const handleError = ({ graphQLErrors, networkError }) => {
    let errors = []
    if (graphQLErrors) errors = graphQLErrors.map(error => error.message)
    if (networkError) errors.push(networkError.toString())

    setHeaderMessage({
      success: false,
      error: true,
      header: 'Create Book Failed',
      content: errors.join(', ')
    })
    setTimeout(() => {
      setHeaderMessage(null)
    }, 10000)
  }

  const handleCompleted = () => {
    setHeaderMessage({
      success: true,
      error: false,
      header: 'Added Book Successful',
      content: ''
    })
    setTimeout(() => {
      setHeaderMessage(null)
    }, 10000)
  }

  const [addBook, { loading: mutationLoading }] = useMutation(CREATE_BOOK,  {
    onError: handleError,
    onCompleted: handleCompleted,
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
      {headerMessage && <Message { ...headerMessage }/>}
      <Form loading={mutationLoading}>
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