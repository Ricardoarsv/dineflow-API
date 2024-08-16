const Server = require('./src/models/server.model.js')

// Start the server
const App = new Server()
App.routes()
App.listen()

module.exports = App
