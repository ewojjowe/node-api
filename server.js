require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const errorMiddleware = require('./middlewares/errorMiddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const ALLOWED_ORIGIN_1 = process.env.ALLOWED_ORIGIN_1
const ALLOWED_ORIGIN_2 = process.env.ALLOWED_ORIGIN_2

const corsOptions = {
  origin: [ALLOWED_ORIGIN_1, ALLOWED_ORIGIN_2], // change to allowed IP or Domain
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorMiddleware)

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  //   throw new Error('fake error')
  res.send('Node API')
})

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to mongoDB!')
    app.listen(PORT, () => {
      console.log(`Node server running port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
