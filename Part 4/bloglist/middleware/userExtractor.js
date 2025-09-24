const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  if (req.token) {
    req.user = await User.findById(req.user.id)
  }
  next()
}

module.exports = userExtractor
