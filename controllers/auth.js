const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  return res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user || !await user.comparePassword(password)) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()

  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login
}
