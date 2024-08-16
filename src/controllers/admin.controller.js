const Admin = require('../models/admin.models')

// User controller
class AdminController {
  async getUsers (req, res) {
    console.log('GET /get_users')
    const authorization = req.headers.authorization
    const user = new Admin(req.body)
    const { data, error } = await user.readAllUsers(authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async createUser (req, res) {
    console.log('POST /create_user')
    const authorization = req.headers.authorization
    const user = new Admin(req.body)
    const { data, error } = await user.createUser(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async getTables (req, res) {
    console.log('GET /get_tables')
    const authorization = req.headers.authorization
    const tables = new Admin(req.body)
    const { data, error } = await tables.readAllTables(authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async createTable (req, res) {
    console.log('GET /create_table')
    const authorization = req.headers.authorization
    const tables = new Admin(req.body)
    const { data, error } = await tables.createTable(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async deleteTable (req, res) {
    console.log('GET /delete_table')
    const authorization = req.headers.authorization
    const tables = new Admin(req.body)
    const { data, error } = await tables.deleteTable(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async changeTableStatus (req, res) {
    console.log('GET /change_tableStatus')
    const authorization = req.headers.authorization
    const tables = new Admin(req.body)
    const { data, error } = await tables.changeTableStatus(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async changeTableNumber (req, res) {
    console.log('GET /change_tableNum')
    const authorization = req.headers.authorization
    const tables = new Admin(req.body)
    const { data, error } = await tables.changeTableNumber(req.body, authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new AdminController()
