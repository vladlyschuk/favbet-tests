import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PersonalOfficePage extends BasePage {
  private readonly settingsSection: Locator;
  private readonly lightThemeButton: Locator;
  private readonly darkThemeButton: Locator;
  private readonly bodyElement: Locator;
  private readonly personalOfficeTitle: Locator;
  private readonly settingLanguageButton: Locator;
  private readonly ukrainianLanguageSelect: Locator;
  private readonly englishLanguageSelect: Locator;

  constructor(page: Page) {
    super(page);
    
    this.personalOfficeTitle = this.page.getByTestId('personal-office-menu-title');
 
    this.lightThemeButton = this.page.getByTestId('settings-color-scheme-switcher-light');
    this.darkThemeButton = this.page.getByTestId('settings-color-scheme-switcher-dark');
    this.ukrainianLanguageSelect = this.page.getByTestId('option-uk');
    this.englishLanguageSelect = this.page.getByTestId('option-en');
    this.settingLanguageButton = this.page.getByTestId('settings-language');
    this.bodyElement = this.page.locator('body');

    this.settingsSection = this.page.getByTestId('settings');
  }

  async switchToLightTheme(): Promise<void> {
    await this.lightThemeButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.lightThemeButton.click();
  }

  async switchToDarkTheme(): Promise<void> {
    await this.darkThemeButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.darkThemeButton.click();
  }

  async getCurrentTheme(): Promise<'light' | 'dark' | 'unknown'> {
    const bodyClass = await this.bodyElement.getAttribute('class');
      
    if (bodyClass?.includes('light')) {
      return 'light';
    } else if (bodyClass?.includes('dark')) {
      return 'dark';
    } else {
      return 'unknown';
    }
  }

  async isLightThemeApplied(): Promise<boolean> {
    const bodyClass = await this.bodyElement.getAttribute('class');
    return bodyClass?.includes('favbet light') || false;
  }

  async isDarkThemeApplied(): Promise<boolean> {
    const bodyClass = await this.bodyElement.getAttribute('class');
    return bodyClass?.includes('favbet dark') || false;
  }

  async waitForSettingsPageLoad(): Promise<void> {
    await this.lightThemeButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.darkThemeButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  async waitForPersonalOfficePageLoad(): Promise<void> {
    await this.personalOfficeTitle.waitFor({ state: 'visible', timeout: 5000 });
  }

  async getCurrentOfficeTitleText(): Promise<string> {
    const text = await this.personalOfficeTitle.textContent();
    return text ? text.toString() : '';
  }

  async clickToSettingsLanguage(): Promise<void> {
    await this.settingLanguageButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.settingLanguageButton.click();
  }

  async selectUkrainianLanguage(): Promise<void> {
    await this.clickToSettingsLanguage();
    await this.ukrainianLanguageSelect.waitFor({ state: 'visible', timeout: 5000 });
    await this.ukrainianLanguageSelect.click();
    await this.page.waitForURL('**/uk/**');
  }

  async selectEnglishLanguage(): Promise<void> {
    await this.clickToSettingsLanguage();
    await this.englishLanguageSelect.waitFor({ state: 'visible', timeout: 5000 });
    await this.englishLanguageSelect.click();
    await this.page.waitForURL('**/en/**');
  }
}
