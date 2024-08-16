const Auth = require('../models/auth.models')

// Auth controller
class AuthController {
  async signIn (req, res) {
    console.log('POST /sign_in')
    const { email, password } = req.body
    const authInstance = new Auth()
    try {
      const { user, customClaims } = await authInstance.signIn(email, password)
      const tokenPayload = {
        role: customClaims.role,
        email: user.email
      }
      const token = await authInstance.createToken(tokenPayload)
      res.json({ token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new AuthController()
