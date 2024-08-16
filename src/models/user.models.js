const db = require('../config/firebase')
const { collection, getDocs } = require('firebase/firestore')

// User model
class User {
  constructor (user) {
    this.user = user
  }

  async readAllUsers () {
    try {
      const usersCollection = collection(db, 'users')
      const userSnapshot = await getDocs(usersCollection)
      const userList = userSnapshot.docs.map((doc) => doc.data())
      return { data: userList, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}

module.exports = User
