import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls createBlog with correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const titleInput = screen.getByPlaceholderText('blog title')
    const authorInput = screen.getByPlaceholderText('blog author')
    const urlInput = screen.getByPlaceholderText('blog url')
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'Testing forms is important')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://example.com')
    await user.click(submitButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'Testing forms is important',
      author: 'Test Author',
      url: 'https://example.com'
    })
  })
})