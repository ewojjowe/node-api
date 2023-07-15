require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', productRoute)

app.get('/', (req, res) => {
  res.send('Node API')
})

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => {
      console.log(`Node server running port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
