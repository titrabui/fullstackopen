import React from 'react';
import { useField } from '../hooks'

const BlogForm = ({ handleCreateBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
