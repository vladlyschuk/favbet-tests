import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FooterPage extends BasePage {
  private readonly footerWrapper: Locator;
  private readonly youtubeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.footerWrapper = this.page.getByTestId('footer-rows-wrapper');
    this.youtubeButton = this.footerWrapper.locator('a[href*="youtube.com"]');
  }

  async isFooterVisible(): Promise<boolean> {
    try {
      await this.footerWrapper.waitFor({ state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }

  async clickYouTubeButton(): Promise<void> {
    await this.youtubeButton.click();
  }

  async getYouTubeLink(): Promise<string | null> {
    await this.youtubeButton.waitFor({ state: 'visible' });
    return await this.youtubeButton.getAttribute('href');
  }

  async isYouTubeButtonVisible(): Promise<boolean> {
    try {
      await this.youtubeButton.waitFor({ state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }

  async scrollToFooter(): Promise<void> {
    await this.footerWrapper.scrollIntoViewIfNeeded();
  }
}
