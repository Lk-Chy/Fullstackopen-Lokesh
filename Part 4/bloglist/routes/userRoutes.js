const usersRouter = require('express').Router()
const userController = require('../controllers/userController')

usersRouter.get('/', userController.getUsers)
usersRouter.post('/', userController.createUser)

module.exports = usersRouter
