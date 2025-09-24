const Blog = require("../models/blog");

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "test",
    url: "test.com",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

module.exports = { nonExistingId };
