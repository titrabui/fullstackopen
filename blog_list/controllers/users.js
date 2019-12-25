const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(user => user.toJSON()))
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    let user = new User(body)
    await user.validate()

    const saltOrArounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltOrArounds)

    user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash
    })

    const savedUser = await user.save({ validateBeforeSave: false })
    response.json(savedUser.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter
