const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('Connect to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('Connected to', config.MONGODB_URI)
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleWare.unKnownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app
