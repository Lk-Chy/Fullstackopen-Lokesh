const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username);
  await page.locator('input[name="Password"]').fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByPlaceholder("blog title").fill(title);
  await page.getByPlaceholder("blog author").fill(author);
  await page.getByPlaceholder("blog url").fill(url);
  await page.getByRole("button", { name: "create" }).click();

  // Wait for the blog to actually appear in the list (use first() to avoid strict mode violations)
  await page.getByText(`${title} ${author}`).first().waitFor();

  // Also wait for the form to close
  await page.getByRole("button", { name: "new blog" }).waitFor();
};

module.exports = { loginWith, createBlog };
