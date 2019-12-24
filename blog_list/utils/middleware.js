const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unKnownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    const validateErrors = Object.keys(error.errors).map(key => {
      return { key, message: error.errors[key].message }
    })
    return response.status(400).json({ error: validateErrors })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unKnownEndpoint,
  errorHandler
}
