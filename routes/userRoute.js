const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// register user
router.post('/register', userController.registerUser)

// login user
router.post('/login', userController.loginUser)

module.exports = router
