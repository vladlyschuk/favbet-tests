import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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
    // Кастомный селектор для testId - используем data-role вместо data-testid
    testIdAttribute: 'data-role',
    // Full screen browser settings
    // For development - run in headed mode
    headless: process.env.HEADLESS !== 'false',
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox']
      },
    },
  ],

  outputDir: 'test-results/',
});