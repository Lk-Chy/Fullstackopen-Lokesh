import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders title and author, but not url or likes by default', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'https://testing-library.com/',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const mockHandler = () => {}

    render(
      <Blog 
        blog={blog} 
        handleLike={mockHandler}
        handleDelete={mockHandler}
        user={null}
      />
    )

    const element = screen.getByText('Component testing is done with react-testing-library Test Author')
    expect(element).toBeInTheDocument()

    const urlElement = screen.queryByText('https://testing-library.com/')
    expect(urlElement).not.toBeInTheDocument()

    const likesElement = screen.queryByText('likes 5')
    expect(likesElement).not.toBeInTheDocument()
  })

  test('clicking the view button shows url and likes', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'https://testing-library.com/',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const mockHandler = () => {}

    render(
      <Blog 
        blog={blog} 
        handleLike={mockHandler}
        handleDelete={mockHandler}
        user={null}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const urlElement = screen.getByText('https://testing-library.com/')
    expect(urlElement).toBeInTheDocument()

    const likesElement = screen.getByText('likes 5')
    expect(likesElement).toBeInTheDocument()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'https://testing-library.com/',
      likes: 5,
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const mockLikeHandler = vi.fn()
    const mockDeleteHandler = () => {}

    render(
      <Blog 
        blog={blog} 
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
        user={null}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})