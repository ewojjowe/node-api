const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Node API')
})

app.listen(3000, () => {
  console.log(`Node server running port 3000`)
})
