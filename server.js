const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Node API')
})

app.get('/blog', (req, res) => {
  res.send('BLog Node API, WELCOME BACK TO ME')
})

// get product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find any product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

// get products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    if (!products) {
      res.status(404).json({ message: `Cannot find any products` })
      return
    }
    res.status(200).json(products)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      res.status(500).json({ message: `Cannot create product` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

// update product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body)
    const product = await Product.findById(id)
    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find the product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

// delete data
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      res.status(404).json({ message: `Cannot find product with ID: ${id}` })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

mongoose.set('strictQuery', false)
mongoose
  .connect(
    'mongodb+srv://joweDev:joweDev@jowedevapi.thbkgpc.mongodb.net/node-api?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to mongoDB')
    app.listen(3000, () => {
      console.log(`Node server running port 3000`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
