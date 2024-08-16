const OrderController = require('../controllers/order.controller')
const { Router } = require('express')

const OrderRouter = Router()

OrderRouter.post('/create_order', OrderController.createOrder)
OrderRouter.put('/update_order/:orderId', OrderController.updateOrder)
OrderRouter.put('/reject_order/:orderId', OrderController.rejectOrder)
OrderRouter.get('/change_OrderStatus/:orderId', OrderController.changeOrderStatus)
OrderRouter.get('/get_ordersByUser/:userID', OrderController.getOrdersByUserID)
OrderRouter.get('/get_ordersByDate', OrderController.getOrdersByDate)

module.exports = OrderRouter
