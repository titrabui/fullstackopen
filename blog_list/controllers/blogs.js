const jwt = require('jsonwebtoken')
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
  const body = request.body
  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
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
  const body = request.body
  const blogId = request.params.id

  try {
    const blog = await Blog.findById(blogId)
    const user = await User.findById(body.userId)

    if (blog.user && blog.user.toString() !== body.userId) {
      const oldUser = await User.findById(blog.user.toString())
      oldUser.blogs = oldUser.blogs.filter(item => item._id.toString() !== blogId)
      await oldUser.save()

      user.blogs = user.blogs.concat(blog._id)
      await user.save()
    }

    const updateData = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }

    const updatedBlog = await Blog
      .findByIdAndUpdate(blogId, updateData, { new: true })
      .populate('user', { username: 1, name: 1 })
    response.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const removeBlog = await Blog.findById(request.params.id)

    if (decodedToken.id.toString() !== removeBlog.user._id.toString()) {
      return response.status(401).json({ error: 'action denied' })
    }

    await Blog.findByIdAndRemove(request.params.id)

    if (removeBlog) {
      const user = await User.findById(removeBlog.user.toString())
      user.blogs = user.blogs.filter(u => u._id.toString() !== request.params.id)
      await user.save()
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
