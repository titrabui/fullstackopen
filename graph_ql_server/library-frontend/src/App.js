import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Container, Menu, Dropdown, Icon } from 'semantic-ui-react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { LOGIN } from './gqlDocumentNodes'

const App = () => {
  const [page, setPage] = useState('authors')
  const [loggedUser, setLoggedUser] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('booklist-logged-user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [])

  const handleError = ({ graphQLErrors, networkError }) => {
    let errors = []
    if (graphQLErrors) errors = graphQLErrors.map(error => error.message)
    if (networkError) errors.push(networkError.toString())
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setLoggedUser(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!loggedUser) {
    return (
      <LoginForm
        login={login}
        setLoggedUser={setLoggedUser}
      />
    )
  }

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
            name='add book'
            active={page === 'add'}
            onClick={() => setPage('add')}
          />
          <Menu.Menu position='right'>
            <Dropdown text={loggedUser.name} pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>
                  <Icon name='log out' />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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