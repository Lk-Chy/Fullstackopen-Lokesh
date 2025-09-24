const dummy = (blogs) => 1
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)
const favoriteBlog = (blogs) => blogs.length === 0 ? null : blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const count = {}
  blogs.forEach(blog => { count[blog.author] = (count[blog.author] || 0) + 1 })
  let max = 0, author = ''
  for (let key in count) { if (count[key] > max) { max = count[key]; author = key } }
  return { author, blogs: max }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const count = {}
  blogs.forEach(blog => { count[blog.author] = (count[blog.author] || 0) + blog.likes })
  let max = 0, author = ''
  for (let key in count) { if (count[key] > max) { max = count[key]; author = key } }
  return { author, likes: max }
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
