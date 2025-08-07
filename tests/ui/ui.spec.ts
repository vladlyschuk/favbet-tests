import { test, expect } from '../../src/fixtures/ui-fixtures';



// should I use window.isAutomationTestRun?


test.describe('UI Tests', () => {
  test('Test 1 - Favorites Management', async ({ 
    livePage, 
    favoritesPage 
  }) => {
    await livePage.navigateToLive();

    const availableMatches = await livePage.getAvailableMatches();
    expect(availableMatches.length).toBeGreaterThan(0);

    const matchesToFavorite = availableMatches.slice(0, Math.min(3, availableMatches.length));

    for (const match of matchesToFavorite) {
      await livePage.addMatchToFavorites(match);
    }

    await favoritesPage.navigateToFavorites();

    const favoritesCount = await favoritesPage.getMatchesCount();
    expect(favoritesCount).toBe(matchesToFavorite.length);

    const removedCount = await favoritesPage.removeAllMatchesFromFavorites();
    expect(removedCount).toBeGreaterThan(0);
    expect(removedCount).toBeLessThanOrEqual(matchesToFavorite.length);

    const finalCount = await favoritesPage.getMatchesCount();
    expect(finalCount).toBe(0);
  });

  test('Test 2 - YouTube Social Network Integration', async ({ page, livePage }) => {
    await livePage.navigateToLive();

    const isFooterVisible = await livePage.footerComponent.isVisible();
    expect(isFooterVisible).toBe(true);

    await livePage.footerComponent.clickYouTubeButton();

    const youtubeLink = await livePage.footerComponent.getYouTubeLink();
    expect(youtubeLink).toContain('youtube.com');
    expect(youtubeLink).toContain('@favbetua');

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      livePage.footerComponent.clickYouTubeButton()
    ]);
    
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('youtube.com');

    const consentButton = newPage.getByRole('button', { name: 'Accept all' });
    await consentButton.click();
    await newPage.waitForLoadState();
    await newPage.getByRole('tab', { name: 'Videos' }).click();
    await newPage.waitForLoadState();
    const videoLocator = newPage.getByLabel('FAVBET | Support Those Who Support Us: ENGLAND | 2022 FIFA World Cup');
    await expect(videoLocator).toBeVisible();
  });

  test('Test 3 - Settings Configuration', async ({ 
    livePage,
    personalOfficePage
  }) => {
    await livePage.navigateToLive();
    await livePage.userMenuComponent.openUserMenu();
    await livePage.userMenuComponent.navigateToSettings();
    await personalOfficePage.waitForSettingsPageLoad();
    await personalOfficePage.switchToLightTheme();

    const isLightThemeApplied = await personalOfficePage.isLightThemeApplied();
    expect(isLightThemeApplied).toBe(true);

    await personalOfficePage.switchToDarkTheme();

    const isDarkThemeApplied = await personalOfficePage.isDarkThemeApplied();
    expect(isDarkThemeApplied).toBe(true);

    await personalOfficePage.selectEnglishLanguage();
    const newLanguage = await personalOfficePage.getCurrentOfficeTitleText();
    expect(newLanguage).toBe('PERSONAL OFFICE');

    await personalOfficePage.selectUkrainianLanguage();
    const currentLanguage = await personalOfficePage.getCurrentOfficeTitleText();
    expect(currentLanguage).toBe('ОСОБИСТИЙ КАБІНЕТ');
  });
});
