const { auth: firebaseauth } = require('../config/firebase.admin')
const { db: databaseCollections } = require('../config/firebase')
const { collection, setDoc, getDocs, query, orderBy, limit, doc, where, deleteDoc } = require('firebase/firestore') // Asegúrate de importar los métodos necesarios
const addRoleToUser = require('../utils/addRolesUsers')
const Auth = require('../models/auth.models')

// User model
class Admin {
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

  async readAllTables (authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const tablesCollection = collection(databaseCollections, 'tables')
      const tablesSnapshot = await getDocs(tablesCollection)
      const tablesList = tablesSnapshot.docs.map((doc) => doc.data())
      return { data: tablesList, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async createTable (table, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')

      // Consulta para obtener el último documento en la colección 'tables'
      const lastTableQuery = query(
        tablesCollection,
        orderBy('id', 'desc'),
        limit(1)
      )
      const lastTableSnapshot = await getDocs(lastTableQuery)

      // Consulta para verificar si ya existe una mesa con ese numero de mesa (tableNum)
      const tableNumbQuery = query(
        tablesCollection,
        where('tableNum', '==', table.tableNum)
      )
      const tableNumbSnapshot = await getDocs(tableNumbQuery)
      if (!tableNumbSnapshot.empty) {
        return {
          data: null,
          error: 'Table number already exists in the database'
        }
      }

      let newId = 1 // Valor inicial si no hay documentos en la colección
      if (!lastTableSnapshot.empty) {
        const lastTable = lastTableSnapshot.docs[0].data()
        newId = lastTable.id + 1 // Incrementa el ID
      }

      // Asigna el nuevo ID al documento de la tabla
      table.id = newId

      // Crea una referencia al nuevo documento con el ID especificado
      const newTableDocRef = doc(tablesCollection, newId.toString())

      // Agrega el nuevo documento a la colección 'tables' con el ID especificado
      await setDoc(newTableDocRef, table)
      return { data: { id: newId }, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async deleteTable (table, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')
      const tableDoc = doc(tablesCollection, table.tableId.toString())
      const tableNum = tableDoc.tableNum
      await deleteDoc(tableDoc)
      return { data: { tableNum }, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async changeTableStatus (table, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')

      const tableDoc = doc(tablesCollection, table.tableId.toString())
      const newTable = { status: table.status }
      await setDoc(tableDoc, newTable, { merge: true })
      return { data: { id: table.tableId, status: table.status }, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async changeTableNumber (table, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyAdminToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const tablesCollection = collection(databaseCollections, 'tables')

      // Consulta para verificar si ya existe una mesa con ese numero de mesa (tableNum)
      const tableNumbQuery = query(
        tablesCollection,
        where('tableNum', '==', table.tableNum)
      )
      const tableNumSnapshot = await getDocs(tableNumbQuery)
      console.log(tableNumSnapshot)
      if (!tableNumSnapshot.empty) {
        return {
          data: null,
          error: 'Table number already exists in the database'
        }
      }

      const tableDoc = doc(tablesCollection, table.tableId.toString())
      const newTable = { tableNum: table.tableNum }
      await setDoc(tableDoc, newTable, { merge: true })
      return {
        data: { id: table.tableId, TableNum: newTable.tableNum },
        error: null
      }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }
}
module.exports = Admin
