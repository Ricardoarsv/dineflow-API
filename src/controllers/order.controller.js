const Order = require('../models/order.model')

class OrderController {
  async createOrder (req, res) {
    console.log('POST /create_order')
    const authorization = req.headers.authorization
    const order = new Order(req.body)
    const { data, error } = await order.createOrder(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async updateOrder (req, res) {
    console.log('PUT /update_order')
    const authorization = req.headers.authorization
    const orderId = req.params.orderId
    const order = new Order(req.body)
    const { data, error } = await order.updateOrder(orderId, req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async rejectOrder (req, res) {
    console.log('PUT /reject_order')
    const authorization = req.headers.authorization
    const orderId = req.params.orderId
    const order = new Order(req.body)
    const { data, error } = await order.rejectOrder(orderId, req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async getOrdersByUserID (req, res) {
    console.log('GET /get_orders_by_user_id')
    const authorization = req.headers.authorization
    const userID = req.params.userID
    const order = new Order()
    const { data, error } = await order.readOrdersByUserID(userID, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async getOrdersByDate (req, res) {
    console.log('GET /get_OrdersByDate')
    const authorization = req.headers.authorization
    const date = req.body.date
    const order = new Order()
    const { data, error } = await order.readAllOrderByDate(date, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async changeOrderStatus (req, res) {
    console.log('PUT /change_order_status')
    const authorization = req.headers.authorization
    const orderId = req.params.orderId
    const status = req.body.status
    const order = new Order(req.body)
    const { data, error } = await order.changeOrderStatus(
      orderId,
      status,
      authorization
    )
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new OrderController()
