const { auth: firebaseauth } = require('../config/firebase.admin')
const addRoleToUser = require('../utils/addRolesUsers')
const Auth = require('../models/auth.models')

// User model
class User {
  constructor (user) {
    this.user = user
    this.auth = new Auth()
  }

  async readAllUsers (authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const usersList = []
      let nextPageToken
      do {
        const listUsersResult = await firebaseauth.listUsers(
          1000,
          nextPageToken
        )
        listUsersResult.users.forEach((userRecord) => {
          usersList.push(userRecord.toJSON())
        })
        nextPageToken = listUsersResult.pageToken
      } while (nextPageToken)
      return { data: usersList, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async createUser (user, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const userRecord = await firebaseauth.createUser({
        email: user.email,
        password: user.password
      })
      addRoleToUser(userRecord.uid, user.role)
      return { data: userRecord, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}

module.exports = User
