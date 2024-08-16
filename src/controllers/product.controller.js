const Product = require('../models/product.models')

// User controller
class ProductController {
  async getAvaibleProducts (req, res) {
    console.log('GET /get_avaible_products')
    const product = new Product(req.body)
    const { data, error } = await product.readAllAvaibleProdutcs()
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async createProduct (req, res) {
    console.log('POST /create_product')
    const product = new Product(req.body)
    const { data, error } = await product.createProduct()
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new ProductController()
