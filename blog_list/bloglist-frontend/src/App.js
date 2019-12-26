import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import HeaderMessage from './components/HeaderMessage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({}) //title: '', author: '', url: '' 
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const getAllBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setHeaderMessage({ message: 'Can not get all blogs data', type: 'error' })
    }
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setHeaderMessage({ message: 'Logined success, welcome to blog list', type: 'success' })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      getAllBlogs()
    } catch (error) {
      setHeaderMessage({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = () => {
    if (window.localStorage.getItem('loggedBlogUser')) {
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
    }
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlog)
      setHeaderMessage({ message: 'Create blog successful', type: 'success' })
      setBlogs(blogs.concat(createdBlog))
      setNewBlog({})
    } catch (error) {
      setHeaderMessage({ message: 'Create blogs failed', type: 'error' })
    }
  }

  const setHeaderMessage = (messageObject) => {
    setMessage(messageObject)
    if (messageObject.type === 'success') {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    if (user !== null) return (
      <div>
        <h4>Logined with {user.name}</h4>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              name="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }

  const blogCreate = () => {
    return (
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            Title
            <input
              name="Title"
              value={newBlog.title || ''}
              onChange={(event) => { setNewBlog({ ...newBlog, title: event.target.value }) }}
            />
          </div>
          <div>
            Author
            <input
              name="Author"
              value={newBlog.author || ''}
              onChange={(event) => { setNewBlog({ ...newBlog, author: event.target.value }) }}
            />
          </div>
          <div>
            URL
            <input
              name="Url"
              value={newBlog.url || ''}
              onChange={(event) => { setNewBlog({ ...newBlog, url: event.target.value }) }}
            />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  }

  const blogList = () => {
    if (user === null) return null

    return (
      <div>
        <h2>Blogs</h2>
        { blogs.map(b => <Blog key={b.id} blog={b}></Blog>) }
      </div>
    )
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Blog List</h1>
      <HeaderMessage content={message}></HeaderMessage>
      { loginForm() }
      { user !== null && blogCreate() }
      { blogList() }
    </div>
  )
}

export default App
