# Favbet Test Automation Framework

Comprehensive test automation suite for Favbet.ua using Playwright and TypeScript with Page Object Model pattern and custom API builders.

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd favbet-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install:browsers
```

4. Set up environment variables (optional):
```bash
# Create .env file for custom configuration
echo "BASE_URL=https://favbet.ua" > .env
echo "HEADLESS=true" >> .env
```

## 🧪 Running Tests

### All tests
```bash
npm test
```

### UI tests only
```bash
npm run test:ui
```

### API tests only  
```bash
npm run test:api
```

### Debug mode (with Playwright Inspector)
```bash
npm run test:debug
```

### Headed mode (see browser)
```bash
npm run test:headed
```

## 📊 Test Reports

### View latest report

```bash
npm run report
```

Reports are generated in:

- `playwright-report/` - HTML reports with detailed test execution data
- `test-results/` - JSON results and video recordings

## 🎥 Test Evidence & Video Recordings

#### UI Test Execution Video

![Test 1](docs/videos/UI_TEST_1.webm)
![Test 2](docs/videos/UI_TEST_2.webm)
![Test 3](docs/videos/UI_TEST_3.webm)


## 🏗️ Project Structure

```text
favbet-tests/
├── src/
│   ├── builders/        # API request builders
│   │   ├── ApiRequestBuilder.ts     # Base API request builder
│   │   └── BonusApiBuilder.ts       # Specialized bonus API builder
│   ├── components/      # Reusable UI components
│   │   ├── BaseComponent.ts         # Base component class
│   │   ├── FooterComponent.ts       # Footer component
│   │   └── UserMenuComponent.ts     # User menu component
│   ├── fixtures/        # Playwright fixtures and test setup
│   │   └── ui-fixtures.ts          # Custom fixtures for pages
│   └── pages/           # Page Object Model classes
│       ├── BasePage.ts             # Base page class
│       ├── FavoritesPage.ts        # Favorites page object
│       ├── FooterPage.ts           # Footer page object
│       ├── LivePage.ts             # Live page object
│       ├── LoginPage.ts            # Login page object
│       └── personalOffice/
│           └── PersonalOfficePage.ts # Personal office page
├── tests/
│   ├── api/             # API test specifications
│   │   └── api.spec.ts             # Bonus and analytics API tests
│   └── ui/              # UI test specifications
│       └── ui.spec.ts              # Favorites, YouTube, Settings tests
├── test-results/        # Test execution artifacts
├── playwright-report/   # HTML test reports
├── auth-state.json     # Authentication state storage
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🧪 Test Implementation

### UI Tests

1. **Favorites Management** - Add/remove favorites, verify persistence
2. **YouTube Integration** - Verify social network integration
3. **Settings Configuration** - Language and theme changes

### API Tests

1. **Bonuses API** - Retrieve and validate bonus information using custom builder pattern
2. **Analytics Events** - Test analytics event tracking for favorite actions

## ⚙️ Configuration

Configuration is handled through:

- `playwright.config.ts` - Playwright settings, browser configuration, reporting
- `.env` - Environment variables (optional)
- `tsconfig.json` - TypeScript compilation settings

## 🔧 Key Features

### Page Object Model

Well-structured page objects with component-based architecture:

```typescript
// Example: Using page objects in tests
const availableMatches = await livePage.getAvailableMatches();
await livePage.addMatchToFavorites(match);
```

### Custom Fixtures

Playwright fixtures provide clean test setup:

```typescript
test('Favorites test', async ({ livePage, favoritesPage }) => {
  // Test implementation
});
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Application base URL | `https://favbet.ua` |
| `HEADLESS` | Run in headless mode | `true` |


## 📄 License

MIT License
