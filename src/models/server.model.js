// Paquetes de Node.js
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const pc = require('picocolors')

// Rutas de la API
const userRoutes = require('../routes/user.route')
const productRoutes = require('../routes/product.route')
const authRoutes = require('../routes/auth.route')
// Acceso a variables de entorno
dotenv.config()

class Server {
  constructor () {
    // Inicialización del servidor
    this.app = express()
    this.port = process.env.PORT

    // Routes
    this.whiteList = [
      `http://localhost:${this.port}`
    ]

    // Middlewares
    this.middlewares()

    // Routes
    this.userRoutePath = '/api/v1/user'
    this.authRoutesPath = '/api/v1/auth'
    this.productsRoutePath = '/api/v1/products'
    this.ordersRoutePath = '/api/v1/orders'
    this.ordersItemsRoutePath = '/api/v1/orders_items'
    this.tablesRoutePath = '/api/v1/tables'

    this.routes()
  }

  middlewares () {
    // CORS
    this.app.use(cors({ origin: this.whiteList, credentials: true }))

    // Body read and parse
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.userRoutePath, userRoutes)
    this.app.use(this.productsRoutePath, productRoutes)
    this.app.use(this.authRoutesPath, authRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(
        pc.dim('--------------------------------------------------'),
        pc.blue('\n Dineflow app listening on port'),
        pc.yellow(`http://localhost:${this.port} 🚀 \n`),
        pc.green('Press Ctrl+C to quit \n'),
        pc.dim('--------------------------------------------------'),
        pc.blue('\n Avaible routes: \n'),
        pc.yellow(`http://localhost:${this.port}/${this.productsRoutePath} \n`),
        pc.yellow(`http://localhost:${this.port}/${this.authRoutesPath} \n`),
        pc.yellow(`http://localhost:${this.port}/${this.ordersRoutePath} \n`),
        pc.yellow(`http://localhost:${this.port}/${this.ordersItemsRoutePath} \n`),
        pc.yellow(`http://localhost:${this.port}/${this.tablesRoutePath} \n`),
        pc.yellow(`http://localhost:${this.port}/${this.userRoutePath} \n`),
        pc.dim('--------------------------------------------------')
      )
    })
  }
}

module.exports = Server
