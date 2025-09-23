const blogService = require('../Services/blogServices')

const getAllBlogs = async(req, res)=>{
    try{
        const blogs = await blogService.getAllBlogs()
        res.json(blogs)
    } catch(err){
        res.status(500).json({error: 'Failed to fetch blogs'})
    }
}

const createBlog = async (req, res) =>{
    try{
        const blogData = req.body
        const savedBlog = await blogService.createBlog(blogData)
        res.status(201).json(savedBlog)
    } catch(err){
        res.status(400).json({error: 'Failed to create blog'})
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
}