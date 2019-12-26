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
  const [message, setMessage] = useState(null)

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
      setUser(user)
      setUsername('')
      setPassword('')
      getAllBlogs()
    } catch (error) {
      setHeaderMessage({ message: 'Wrong username or password', type: 'error' })
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
      <h4>Logined with {user.name}</h4>
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
      { blogList() }
    </div>
  )
}

export default App
