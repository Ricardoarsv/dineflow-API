const { auth } = require('../config/firebase')
const { auth: firebaseauth } = require('../config/firebase.admin')
const { signInWithEmailAndPassword } = require('firebase/auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor () {
    this.secretKey = process.env.SECRET_KEY_JWT
  }

  // Create JWT token
  async createToken (payload) {
    try {
      const token = jwt.sign(payload, this.secretKey, { expiresIn: '8h' })
      return token
    } catch (error) {
      console.error('Error creating JWT token:', error)
      throw new Error('Token creation failed')
    }
  }

  // Verify JWT token
  async verifyToken (token) {
    try {
      const decoded = jwt.verify(token, this.secretKey)
      return decoded
    } catch (error) {
      console.error('Error verifying JWT token:', error)
      return null
    }
  }

  async verifyAdminToken (token) {
    try {
      const decoded = await this.verifyToken(token)
      if (!decoded || decoded.role !== 'admin') {
        return null
      }
      return decoded
    } catch (error) {
      console.error('Error verifying admin token:', error)
      return null
    }
  }

  async verifyWaiterToken (token) {
    try {
      const decoded = await this.verifyToken(token)
      if (!decoded || decoded.role !== 'waiter') {
        return null
      }
      return decoded
    } catch (error) {
      console.error('Error verifying waiter token:', error)
      return null
    }
  }

  async verifyChefToken (token) {
    try {
      const decoded = await this.verifyToken(token)
      if (!decoded || decoded.role !== 'chef') {
        return null
      }
      return decoded
    } catch (error) {
      console.error('Error verifying chef token:', error)
      return null
    }
  }

  // Sign in with email and password
  async signIn (email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Obtener los custom claims del usuario
      const userRecord = await firebaseauth.getUser(user.uid)
      const customClaims = userRecord.customClaims || { role: 'user' }
      return { user, customClaims }
    } catch (error) {
      console.error('Error signing in:', error)
      throw new Error('Sign in failed')
    }
  }
}

module.exports = Auth
