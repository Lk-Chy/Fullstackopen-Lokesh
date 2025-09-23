const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const countByAuthor = {};
  blogs.forEach((blog) => {
    countByAuthor[blog.author] = (countByAuthor[blog.author] || 0) + 1;
  });

  const topAuthor = Object.entries(countByAuthor).reduce(
    (max, [author, count]) =>
      count > max.blogs ? { author, blogs: count } : max,
    { author: null, blogs: 0 }
  );

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = {};
  blogs.forEach((blog) => {
    likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes;
  });

  const topAuthor = Object.entries(likesByAuthor).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: null, likes: 0 }
  );

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
