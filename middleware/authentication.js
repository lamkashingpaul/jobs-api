const { UnauthenticatedError, NotFoundError } = require('../errors')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.substring(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name } = payload

    const user = await User.findOne({ _id: userId }).select('-password')
    if (!user) {
      throw new NotFoundError('Authentication invalid')
    }

    req.user = { userId, name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authenticationMiddleware
