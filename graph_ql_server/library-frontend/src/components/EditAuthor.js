import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Dropdown, Button } from 'semantic-ui-react'
import { EDIT_AUTHOR } from '../gqlDocumentNodes'

const EditAuthors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: { name: author, born: Number(born) }
  })

  const handleChange = (e, { value }) => {
    setAuthor(value)
    const selectedAuthor = props.authors.find(a => a.name === value)
    setBorn(selectedAuthor.born || '')
  }

  const updateBorn = () => {
    editAuthor()
    setAuthor('')
    setBorn('')
  }

  if (props.authors.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <Form>
        <Form.Field>
          <Dropdown
            placeholder='Select Author'
            fluid
            search
            selection
            value={author}
            onChange={handleChange}
            options={props.authors.map(a => {
              return { key: a.id, value: a.name, text: a.name }
            })}
          />
        </Form.Field>
        <Form.Field>
          <label>Born</label>
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Button onClick={updateBorn}>Update Born</Button>
        </Form.Field>
      </Form>
    </div>
  )
}

export default EditAuthors
