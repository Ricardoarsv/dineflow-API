const express = require('express')
const AdminController = require('../controllers/admin.controller')

const adminRouter = express.Router()

// User routes
adminRouter.get('/get_users', AdminController.getUsers)
adminRouter.post('/create_user', AdminController.createUser)
adminRouter.get('/get_tables', AdminController.getTables)
adminRouter.post('/create_table', AdminController.createTable)
adminRouter.put('/change_tableStatus', AdminController.changeTableStatus)
adminRouter.put('/change_tableNumber', AdminController.changeTableNumber)
adminRouter.delete('/delete_table', AdminController.deleteTable)

module.exports = adminRouter
