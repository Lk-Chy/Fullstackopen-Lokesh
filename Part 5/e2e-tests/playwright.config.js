const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },

  webServer: {
    command: "cross-env NODE_ENV=test npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    cwd: "../bloglist-frontend",
    env: {
      NODE_ENV: "test",
    },
  },
});
