const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const blogController = require('../controllers/blogController')

router.get('/', blogController.getAllBlogs)
router.post('/', auth, blogController.createBlog)
router.delete('/:id', auth, blogController.deleteBlog)
router.put('/:id', blogController.updateBlog)

module.exports = router
