import React from 'react';
import { useField } from '../hooks'

const BlogForm = ({ handleCreateBlog }) => {
  const title = useField({ id: 'title', type: 'text' })
  const author = useField({ id: 'author', type: 'text' })
  const url = useField({ id: 'url', type: 'text' })

  const handleSubmit = async event => {
    event.preventDefault()
    await handleCreateBlog({
      title: title.props.value,
      author: author.props.value,
      url: url.props.value
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input {...title.props}/>
        </div>
        <div>
          Author
          <input {...author.props}/>
        </div>
        <div>
          URL
          <input {...url.props}/>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
};

export default BlogForm;
