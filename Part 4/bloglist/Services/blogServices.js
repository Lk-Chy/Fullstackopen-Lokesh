const Blog = require('../models/blog')

const getAllBlogs = async () => {
  return await Blog.find({}).populate('user', { username: 1, name: 1 })
}

const createBlog = async (blogData, user) => {
  if (!blogData.title || !blogData.url) throw new Error('title or url missing')
  const blog = new Blog({ ...blogData, likes: blogData.likes || 0, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return savedBlog
}

const deleteBlog = async (blogId, user) => {
  const blog = await Blog.findById(blogId)
  if (!blog) throw { status: 404, message: 'Blog not found' }
  if (blog.user.toString() !== user.id.toString()) throw { status: 401, message: 'Unauthorized' }
  await Blog.findByIdAndRemove(blogId)
}

const updateBlog = async (blogId, blogData) => {
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true, runValidators: true })
  if (!updatedBlog) throw { status: 404, message: 'Blog not found' }
  return updatedBlog
}

module.exports = { getAllBlogs, createBlog, deleteBlog, updateBlog }
