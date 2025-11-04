import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import signupService from './services/signup'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome back, ${user.name}!`)
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    
    try {
      await signupService.signup({
        username,
        name,
        password,
      })
      
      const user = await loginService.login({
        username,
        password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
      setShowSignup(false)
      showNotification(`Account created! Welcome, ${user.name}!`)
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Failed to create account',
        'error'
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    
    try {
      const blogObject = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      }
      
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      showNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Failed to create blog',
        'error'
      )
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      
      <Notification message={notification.message} type={notification.type} />

      {user === null && (
        <div>
          {!showSignup ? (
            // LOGIN FORM
            <div>
              <h2>Log in to application</h2>
              
              <form onSubmit={handleLogin}>
                <div>
                  username
                  <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div>
                  password
                  <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <button type="submit">login</button>
              </form>
              
              <p>
                Don't have an account?{' '}
                <button onClick={() => setShowSignup(true)}>
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            // SIGNUP FORM
            <div>
              <h2>Create a new account</h2>
              
              <form onSubmit={handleSignup}>
                <div>
                  username
                  <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div>
                  name
                  <input
                    type="text"
                    value={name}
                    name="Name"
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <div>
                  password
                  <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <button type="submit">sign up</button>
              </form>
              
              <p>
                Already have an account?{' '}
                <button onClick={() => setShowSignup(false)}>
                  Log in
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {user !== null && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                type="text"
                value={newBlogTitle}
                name="Title"
                onChange={({ target }) => setNewBlogTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                value={newBlogAuthor}
                name="Author"
                onChange={({ target }) => setNewBlogAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                value={newBlogUrl}
                name="Url"
                onChange={({ target }) => setNewBlogUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
          
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App