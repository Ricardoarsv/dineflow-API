const Tables = require('../models/table.models')

class TableController {
  async readTables (req, res) {
    console.log('GET /read_Alltables')
    const authorization = req.headers.authorization
    const tables = new Tables()
    const { data, error } = await tables.readAllTables(authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }

  async getFreeTables (req, res) {
    console.log('GET /get_Freetables')
    const authorization = req.headers.authorization
    const tables = new Tables()
    const { data, error } = await tables.readFreeTables(authorization)
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(data)
  }
}

module.exports = new TableController()
