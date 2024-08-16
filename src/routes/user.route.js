const express = require('express')
const UserController = require('../controllers/user.controller')

const userRouter = express.Router()

// User routes
userRouter.get('/get_users', UserController.getUsers)

module.exports = userRouter
