const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const {
  registerValidation,
  loginValidation,
} = require('../validation/userValidation')

const registerUser = asyncHandler(async (req, res) => {
  // validate input
  const { error } = registerValidation(req.body)
  if (error) throw new Error(error.details[0].message)

  const { name, email, password } = req.body

  // Check if existing email
  const emailExist = await User.findOne({ email })
  if (emailExist) throw new Error(`Email already exist!`)

  // Hash password
  const passwordSalt = await bcrypt.genSalt(process.env.PASSWORD_SALT)
  const hashedPassword = await bcrypt.hash(password, passwordSalt)

  // Register user
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    if (!newUser) {
      res.status(500)
      throw new Error(`Cannot create newUser`)
    }
    res.status(200).json({ user: newUser._id })
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  // validate input
  const { error } = loginValidation(req.body)
  if (error) throw new Error(error.details[0].message)

  const { email, password } = req.body

  // Check if email exist
  const user = await User.findOne({ email })
  if (!user) throw new Error('Ivalid Email or Password!')

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) throw new Error('Invalid Email or Password!')

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = {
  registerUser,
  loginUser,
}
