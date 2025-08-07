import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.HEADLESS ? 1 : 1,
  timeout: 700000,
  expect: {
      timeout: 60000,
  },
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['line']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://favbet.ua',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
    actionTimeout: 60000,
    navigationTimeout: 60000,
    testIdAttribute: 'data-role',
    headless: true,
    ignoreHTTPSErrors: true,
  },

  projects: [
    // {
    //   name: 'chromium',
    //   use: { 
    //     ...devices['Desktop Chrome']
    //   },
    // },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox']
      },
    },
    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari']
    //   },
    // },
  ],

  outputDir: 'test-results/',
});