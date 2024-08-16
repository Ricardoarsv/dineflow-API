const { collection, getDocs, query, where } = require('firebase/firestore')
const { db: databaseCollections } = require('../config/firebase')
const Auth = require('./auth.models')

class Tables {
  constructor () {
    this.auth = new Auth()
  }

  async readAllTables (authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)

      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')

      const tablesSnapshot = await getDocs(tablesCollection)

      const tables = []
      tablesSnapshot.forEach((doc) => {
        tables.push(doc.data())
      })

      return { data: tables, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }

  async readFreeTables (authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)

      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')

      const q = query(tablesCollection, where('status', '==', 'free'))
      const tablesSnapshot = await getDocs(q)

      const tables = []
      tablesSnapshot.forEach((doc) => {
        tables.push(doc.data())
      })

      return { data: tables, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

module.exports = Tables
