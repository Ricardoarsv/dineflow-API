const User = require('../models/user.models')

// User controller
class UserController {
  async getUsers (req, res) {
    console.log('GET /get_users')
    const user = new User(req.body)
    const { data, error } = await user.readAllUsers()
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new UserController()
