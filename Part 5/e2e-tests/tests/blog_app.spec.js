const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Test User",
        username: "testuser",
        password: "password",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const loginHeading = await page.getByText("Log in to application");
    await expect(loginHeading).toBeVisible();

    const usernameInput = await page.locator('input[name="Username"]');
    await expect(usernameInput).toBeVisible();

    const passwordInput = await page.locator('input[name="Password"]');
    await expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testuser", "password");

      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testuser", "wrong");

      await expect(page.getByText("Wrong username or password")).toBeVisible();
      await expect(page.getByText("Test User logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testuser", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "Test Blog Title",
        "Test Author",
        "https://test.com"
      );

      await expect(page.getByText("Test Blog Title Test Author")).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, "Test Blog", "Test Author", "https://test.com");

      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("likes 0")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("user can delete their own blog", async ({ page }) => {
      await createBlog(
        page,
        "Blog to Delete",
        "Test Author",
        "https://test.com"
      );

      // Find the specific blog and click its view button
      const blogToDelete = page
        .locator(".blog")
        .filter({ hasText: "Blog to Delete" });
      await blogToDelete.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());

      await blogToDelete.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText("Blog to Delete Test Author")
      ).not.toBeVisible();
    });

    test("only the creator can see delete button", async ({
      page,
      request,
    }) => {
      await createBlog(page, "First User Blog", "Author", "https://test.com");
      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Other User",
          username: "otheruser",
          password: "password",
        },
      });

      await loginWith(page, "otheruser", "password");

      await page.getByRole("button", { name: "view" }).click();

      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("blogs are ordered by likes", async ({ page }) => {
      await createBlog(page, "First blog", "Author", "https://first.com");
      await createBlog(page, "Second blog", "Author", "https://second.com");
      await createBlog(page, "Third blog", "Author", "https://third.com");

      const secondBlog = page
        .locator(".blog")
        .filter({ hasText: "Second blog" });
      await secondBlog.getByRole("button", { name: "view" }).click();
      await secondBlog.getByRole("button", { name: "like" }).click();
      await expect(secondBlog.getByText("likes 1")).toBeVisible();
      await secondBlog.getByRole("button", { name: "like" }).click();
      await expect(secondBlog.getByText("likes 2")).toBeVisible();

      const thirdBlog = page.locator(".blog").filter({ hasText: "Third blog" });
      await thirdBlog.getByRole("button", { name: "view" }).click();
      await thirdBlog.getByRole("button", { name: "like" }).click();
      await expect(thirdBlog.getByText("likes 1")).toBeVisible();

      const blogs = await page.locator(".blog").allTextContents();
      expect(blogs[0]).toContain("Second blog");
      expect(blogs[1]).toContain("Third blog");
      expect(blogs[2]).toContain("First blog");
    });
  });
});
