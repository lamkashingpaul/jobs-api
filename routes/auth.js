const express = require('express')
const authenticationRouter = express.Router()

const { register, login } = require('../controllers/auth')

authenticationRouter.route('/register').post(register)
authenticationRouter.route('/login').post(login)

module.exports = authenticationRouter
