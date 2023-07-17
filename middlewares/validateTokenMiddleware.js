const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) throw new Error('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    throw new Error('Invalid Token.')
  }
}
