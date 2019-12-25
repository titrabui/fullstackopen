const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    blog
      ? response.json(blog.toJSON())
      : response.status(404).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const blogId = request.params.id
    // const blog = await Blog.findById(blogId)

    // if (blog.user && blog.user.toString() !== body.userId) {
    //   const removeUser = await User.findById(blog.user.toString())
    //   removeUser.blogs = removeUser.blogs.filter(item => item._id.toString() !== blogId)
    //   await removeUser.save()
    // }

    const newUser = await User.findById(body.userId)

    const updateData = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: newUser._id
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
