const { auth: firebaseauth } = require('../config/firebase.admin')

async function addRoleToUser (uid, role) {
  try {
    await firebaseauth.setCustomUserClaims(uid, { role })
    console.log(`Role ${role} added to user ${uid}`)
  } catch (error) {
    console.error('Error adding role to user:', error)
  }
}

module.exports = addRoleToUser
