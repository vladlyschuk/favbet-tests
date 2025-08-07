import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LivePage } from '../pages/LivePage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { PersonalOfficePage } from '../pages/personalOffice/PersonalOfficePage';

type UITestFixtures = {
  loginPage: LoginPage;
  livePage: LivePage;
  favoritesPage: FavoritesPage;
  personalOfficePage: PersonalOfficePage;
};

export const test = base.extend<UITestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  livePage: async ({ page }, use) => {
    const livePage = new LivePage(page);
    await use(livePage);
  },
  favoritesPage: async ({ page }, use) => {
    const favoritesPage = new FavoritesPage(page);
    await use(favoritesPage);
  },
  personalOfficePage: async ({ page }, use) => {
    const personalOfficePage = new PersonalOfficePage(page);
    await use(personalOfficePage);
  },
});

test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.openLoginPage();
  await loginPage.login(
    process.env.TEST_USER_EMAIL || 'temidal533@efpaper.com',
    process.env.TEST_USER_PASSWORD || 'Password1'
  );
   await page.context().storageState({ path: 'auth-state.json' });
});

export { expect } from '@playwright/test';
