import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import {
  Table, Form, Button, Alert,
  Navbar, Nav
} from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Anecdotes</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/create">Create new</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/about">About</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td>
            <td>{anecdote.author}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has { anecdote.votes } votes</p>
      <p>See more in <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Label>Author</Form.Label>
          <Form.Control
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Form.Label>Url for more info</Form.Label>
          <Form.Control
            name='info'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <Button variant="primary" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const CreateNew = withRouter(CreateNewNoHistory)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Menu />
          { notification && <Alert variant="success">{notification}</Alert>}
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />}/>
          <Route path="/create" render={() => <CreateNew addNew={addNew} />}/>
          <Route path="/about" render={() => <About />}/>
          <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />}/>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App;