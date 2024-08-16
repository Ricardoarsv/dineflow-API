const { db: databaseCollections } = require('../config/firebase')
const {
  collection,
  setDoc,
  getDocs,
  query,
  limit,
  orderBy,
  doc,
  where
} = require('firebase/firestore')
const Auth = require('./auth.models')

class Order {
  constructor () {
    this.auth = new Auth()
  }

  async createOrder (orderBody, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      // const decodedToken = await this.auth.verifyWaiterToken(authorization)
      const decodedToken = await this.auth.verifyToken(authorization)

      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }

      const ordersCollection = collection(databaseCollections, 'orders')

      // Consulta para obtener el último documento en la colección 'orders'
      const lastOrderQuery = query(
        ordersCollection,
        orderBy('id', 'desc'),
        limit(1)
      )

      const lastTableSnapshot = await getDocs(lastOrderQuery)

      let newId = 1 // Valor inicial si no hay documentos en la colección
      if (!lastTableSnapshot.empty) {
        const lastTable = lastTableSnapshot.docs[0].data()
        newId = lastTable.id + 1 // Incrementa el ID
      }

      orderBody.id = newId

      // Crea una referencia al nuevo documento con el ID especificado
      const newOrderDocRef = doc(ordersCollection, newId.toString())

      let totalValue = 0

      for (const item of orderBody.items) {
        const orderItemsCollection = collection(
          databaseCollections,
          'order_items'
        )
        const lastOrderItemQuery = query(
          orderItemsCollection,
          orderBy('id', 'desc'),
          limit(1)
        )
        const lastOrderItemSnapshot = await getDocs(lastOrderItemQuery)
        let newOrderItemId = 1
        if (!lastOrderItemSnapshot.empty) {
          const lastOrderItem = lastOrderItemSnapshot.docs[0].data()
          newOrderItemId = lastOrderItem.id + 1
        }
        const itemFormated = {
          id: newOrderItemId,
          orderID: newId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }
        const newOrderItemDocRef = doc(
          orderItemsCollection,
          newOrderItemId.toString()
        )

        totalValue += item.price * item.quantity
        await setDoc(newOrderItemDocRef, itemFormated)
      }

      const orderFormated = {
        id: newId,
        userID: orderBody.userId,
        tableID: orderBody.tableId,
        date: orderBody.date,
        total: totalValue,
        status: orderBody.status
      }

      // Agrega el nuevo documento a la colección 'orders' con el ID especificado
      await setDoc(newOrderDocRef, orderFormated)

      return {
        data: {
          id: newId,
          items: orderBody.items,
          message: 'Order created successfully'
        },
        error: null
      }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async updateOrder (orderId, orderBody, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const orderRef = doc(databaseCollections, 'orders', orderId)
      await setDoc(orderRef, orderBody, { merge: true })
      return { data: orderRef, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async rejectOrder (orderId, status, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const orderRef = doc(databaseCollections, 'orders', orderId)
      await setDoc(orderRef, status, { merge: true })
      return { data: orderRef, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async readOrdersByUserID (userID, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const ordersCollection = collection(databaseCollections, 'orders')
      const ordersItemsCollection = collection(databaseCollections, 'order_items')
      const q = query(ordersCollection, where('userID', '==', parseInt(userID)))
      const querySnapshot = await getDocs(q)
      const orders = []
      await Promise.all(querySnapshot.docs.map(async (doc) => {
        const docData = doc.data()
        docData.items = []
        const queryItems = query(ordersItemsCollection, where('orderID', '==', parseInt(docData.id)))
        const queryItemsSnapshot = await getDocs(queryItems)
        queryItemsSnapshot.forEach((item) => {
          docData.items.push(item.data())
        })
        orders.push(docData)
      }))

      return { data: orders, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async readAllOrders (authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const ordersCollection = collection(databaseCollections, 'orders')
      const q = query(ordersCollection, orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push(doc.data())
      })
      return { data: orders, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async readAllOrderByDate (date, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const ordersCollection = collection(databaseCollections, 'orders')
      const q = query(ordersCollection, where('date', '==', date))
      const querySnapshot = await getDocs(q)
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push(doc.data())
      })
      return { data: orders, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async changeOrderStatus (orderId, status, authorization) {
    try {
      if (!authorization) {
        return { data: null, error: 'Authorization token is required' }
      }
      const decodedToken = await this.auth.verifyToken(authorization)
      if (!decodedToken) {
        return { data: null, error: 'Invalid authorization token' }
      }
      const orderRef = doc(databaseCollections, 'orders', orderId)
      const newStatus = { status }
      await setDoc(orderRef, newStatus, { merge: true })
      return { data: `status has been change to: ${status}`, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}
module.exports = Order
