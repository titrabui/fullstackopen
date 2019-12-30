import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import HeaderMessage from './components/HeaderMessage'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useResource } from './hooks'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const blogService = useResource('api/blogs')

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

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setHeaderMessage({ message: 'Logined success, welcome to blog list', type: 'success' })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
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

  const handleCreateBlog = async newBlog => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setHeaderMessage({ message: 'Create blog successful', type: 'success' })
      setBlogs(blogs.concat(createdBlog))
    } catch (error) {
      setHeaderMessage({ message: 'Create blogs failed', type: 'error' })
    }
  }

  const handleLike = async newBlog => {
    try {
      const updateObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes + 1,
        userId: newBlog.user.id
      }

      const updatedBlog = await blogService.update(newBlog.id, updateObject)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog ))
    } catch (error) {
      setHeaderMessage({ message: 'Like failed', type: 'error' })
    }
  }

  const handleRemove = async blogId => {
    const removeConfirm = window.confirm('Are you sure remove this blog');
    if (removeConfirm) {
      try {
        await blogService.remove(blogId)
        setBlogs(blogs.filter(b => b.id !== blogId))
      } catch (error) {
        setHeaderMessage({ message: 'Remove failed', type: 'error' })
      }
    }
  }

  const setHeaderMessage = messageObject => {
    setMessage(messageObject)
    if (messageObject.type === 'success') {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogList = () => {
    if (user === null) return null

    return (
      <div>
        <h2>Blogs</h2>
        { blogs.map(b => <Blog key={b.id} currentUser={user} blog={b} handleLike={handleLike} handleRemove={handleRemove}></Blog>) }
      </div>
    )
  }

  return (
    <div style={{marginLeft: '2em'}}>
      <h1>Blog List</h1>
      <HeaderMessage content={message}></HeaderMessage>
      { user === null && <LoginForm login={login}></LoginForm> }
      {
        user !== null &&
        <div>
          <h4>Logined with {user.name}</h4>
          <button onClick={() => handleLogout()}>logout</button>
        </div>
      }
      {
        user !== null &&
        <Togglable buttonLabel='new blog'>
          <BlogForm handleCreateBlog={handleCreateBlog}></BlogForm>
        </Togglable>
      }
      { blogList() }
    </div>
  )
}

export default App
