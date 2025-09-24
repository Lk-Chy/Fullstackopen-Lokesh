const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const token = authHeader.substring(7)
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token invalid' })
    }

    req.user = await User.findById(decodedToken.id)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}

module.exports = auth
