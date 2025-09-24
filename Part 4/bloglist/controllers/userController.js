const userService = require('../Services/userServices')

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers()
  res.json(users)
}

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { getUsers, createUser }
