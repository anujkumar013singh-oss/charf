const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message)
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages,
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate field value entered',
    })
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}: ${err.value}`,
    })
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  })
}

export default errorHandler
