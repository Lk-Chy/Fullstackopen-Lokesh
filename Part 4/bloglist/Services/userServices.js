const bcrypt = require("bcrypt");
const User = require("../models/user");

const getAllUsers = async () => {
  return await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
};

const createUser = async ({ username, name, password }) => {
  if (!password || password.length < 3) {
    throw new Error("Password must be at least 3 characters long");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  return savedUser;
};

module.exports = { getAllUsers, createUser };
