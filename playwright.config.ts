import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4431/egypt-social-operations/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && node scripts/serve-dist.mjs 4431 /egypt-social-operations/',
    url: 'http://127.0.0.1:4431/egypt-social-operations/',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
});
