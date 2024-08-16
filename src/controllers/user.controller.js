const User = require('../models/user.models')

// User controller
class UserController {
  async getUsers (req, res) {
    console.log('GET /get_users')
    const authorization = req.headers.authorization
    const user = new User(req.body)
    const { data, error } = await user.readAllUsers(authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async createUser (req, res) {
    console.log('POST /create_user')
    const authorization = req.headers.authorization
    const user = new User(req.body)
    const { data, error } = await user.createUser(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new UserController()
