const { db: databaseCollections } = require('../config/firebase')
const { collection, getDocs, addDoc, query, where } = require('firebase/firestore')

// Products model
class Product {
  constructor (product) {
    this.product = product
  }

  // Read all avaible products
  async readAllAvaibleProdutcs () {
    try {
      const productsCollection = collection(databaseCollections, 'products')
      const q = query(productsCollection, where('status', '==', true))
      const productSnapshot = await getDocs(q)
      const productsList = productSnapshot.docs.map((doc) => doc.data())
      return { data: productsList, error: null }
    } catch (error) {
      console.log(error)
      return { data: null, error }
    }
  }

  async createProduct () {
    try {
      const productsCollection = collection(databaseCollections, 'products')
      await addDoc(productsCollection, this.product)
      return { data: this.product, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}

module.exports = Product
