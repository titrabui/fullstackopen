import React, { useState } from 'react'
import { Container, Menu, Input } from 'semantic-ui-react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <Container>
      <div style={{ marginBottom: 15 }}>
        <Menu pointing secondary>
          <Menu.Item
            name='authors'
            active={page === 'authors'}
            onClick={() => setPage('authors')}
          />
          <Menu.Item
            name='books'
            active={page === 'books'}
            onClick={() => setPage('books')}
          />
          <Menu.Item
            name='add'
            active={page === 'add'}
            onClick={() => setPage('add')}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </Container>
  )
}

export default App