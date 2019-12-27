import React, { useState } from 'react'

const Blog = ({ currentUser, blog, handleLike, handleRemove }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailVisible(!detailVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p onClick={toggleVisibility}>{blog.title} {blog.author}</p>
      </div>
      <div style={showWhenVisible}>
      <p onClick={toggleVisibility}>{blog.title} {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <button style={{backgroundColor: 'blue', color: 'white'}} onClick={() => handleLike(blog)}>like</button>
        </div>
        <p>added by {blog.user && blog.user.name}</p>
        {
          currentUser.username === blog.user.username &&
          <button style={{backgroundColor: 'red'}} onClick={() => handleRemove(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
