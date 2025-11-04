import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    if (handleLike) {
      handleLike(blog)
    }
  }

  const remove = () => {
    if (handleDelete) {
      handleDelete(blog)
    }
  }

  const showDelete = blog.user && user && blog.user.username === user.username

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes || 0}
            {handleLike && <button onClick={like}>like</button>}
          </div>
          <div>{blog.user?.name}</div>
          {showDelete && handleDelete && (
            <button onClick={remove}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.object
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog