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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = authorization && authorization.toLowerCase().startsWith('bearer')
    ? authorization.substring(7)
    : null
  next()
}

module.exports = {
  requestLogger,
  unKnownEndpoint,
  errorHandler,
  tokenExtractor
}
