const TableController = require('../controllers/table.controller')
const { Router } = require('express')

const TableRouter = Router()

TableRouter.get('/read_Alltables', TableController.readTables)
TableRouter.get('/get_Freetables', TableController.getFreeTables)

module.exports = TableRouter
