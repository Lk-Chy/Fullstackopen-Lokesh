const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com',
    likes: 5
  },
  {
    _id: '2',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '3',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com/canonical',
    likes: 12
  },
  {
    _id: '4',
    title: 'Test Blog 1',
    author: 'Lokesh',
    likes: 5
  },
  {
    _id: '5',
    title: 'Test Blog 2',
    author: 'Zeref',
    likes: 3
  },
  {
    _id: '6',
    title: 'Test Blog 3',
    author: 'Zeref',
    likes: 8
  },
  {
    _id: '7',
    title: 'Test Blog 4',
    author: 'Lokesh',
    likes: 7
  },
  {
    _id: '8',
    title: 'Test Blog 5',
    author: 'Zeref',
    likes: 2
  }
]


test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 5)
  })

  test('of a bigger list is calculated right', () => {
    const total = listHelper.totalLikes([blogs[0], blogs[1], blogs[2]])
    assert.strictEqual(total, 24) 
  })
})


describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('returns the blog with most likes', () => {
    const fav = listHelper.favoriteBlog([blogs[0], blogs[1], blogs[2]])
    assert.deepStrictEqual(fav, blogs[2]) 
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('returns author with most blogs', () => {
    const most = listHelper.mostBlogs([blogs[3], blogs[4], blogs[5], blogs[6], blogs[7]])
    assert.deepStrictEqual(most, { author: 'Zeref', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('returns author whose blogs have the most likes', () => {
    const most = listHelper.mostLikes([blogs[3], blogs[4], blogs[5], blogs[6], blogs[7]])
    assert.deepStrictEqual(most, { author: 'Zeref', likes: 13 }) 
  })
})
