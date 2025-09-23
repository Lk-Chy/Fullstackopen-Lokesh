const Blog = require('../models/blog')


const getAllBlogs = async () =>{
    return await Blog.find({})
}

const createBlog = async (blogData) => {
    const blog = new Blog(blogData)
    return await blog.save()
}


module.exports = {
    getAllBlogs,
    createBlog,
}