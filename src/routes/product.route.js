const express = require('express')
const ProductController = require('../controllers/product.controller')

const productRouter = express.Router()

// Product routes
productRouter.get('/get_avaible_products', ProductController.getAvaibleProducts)
productRouter.post('/create_product', ProductController.createProduct)

module.exports = productRouter
