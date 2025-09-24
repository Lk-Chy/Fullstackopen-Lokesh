const listHelper = require("../utils/list_helper");
const blogs = require("./blogs");

test("dummy returns one", () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const total = listHelper.totalLikes([blogs[0], blogs[1], blogs[2]]);
    expect(total).toBe(24);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("returns the blog with most likes", () => {
    const fav = listHelper.favoriteBlog([blogs[0], blogs[1], blogs[2]]);
    expect(fav).toEqual(blogs[2]);
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("returns author with most blogs", () => {
    const most = listHelper.mostBlogs([
      blogs[3],
      blogs[4],
      blogs[5],
      blogs[6],
      blogs[7],
    ]);
    expect(most).toEqual({ author: "Zeref", blogs: 3 });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("returns author whose blogs have the most likes", () => {
    const most = listHelper.mostLikes([
      blogs[3],
      blogs[4],
      blogs[5],
      blogs[6],
      blogs[7],
    ]);
    expect(most).toEqual({ author: "Zeref", likes: 13 });
  });
});
