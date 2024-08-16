// Paquetes de Node.js
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const pc = require('picocolors')

// Rutas de la API
const userRoutes = require('../routes/user.route')

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
        pc.yellow(`http://localhost:${this.port}/${this.userRoutePath} \n`),
        pc.dim('--------------------------------------------------')
      )
    })
  }
}

module.exports = Server
