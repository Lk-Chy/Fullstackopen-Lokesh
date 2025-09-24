const Blog = require('../models/blog')

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
}

const createBlog = async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'Title or URL missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: req.user._id
  })

  const savedBlog = await blog.save()

  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()

  res.status(201).json(savedBlog)
}

const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).end()
  }

  if (blog.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
}

const updateBlog = async (req, res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedBlog)
}

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog
}
