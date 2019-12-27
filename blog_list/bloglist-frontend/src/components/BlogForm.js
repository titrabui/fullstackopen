import React, { useState } from 'react';

const BlogForm = ({ handleCreateBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateBlog(newBlog)
    setNewBlog({})
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
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
};

export default BlogForm;
