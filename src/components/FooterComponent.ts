import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class FooterComponent extends BaseComponent {
  private readonly footerWrapper: Locator;
  private readonly youtubeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.footerWrapper = this.page.locator('[data-role="footer-rows-wrapper"]');
    this.youtubeButton = this.footerWrapper.locator('a[href*="youtube.com"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.waitForElement(this.footerWrapper);
  }

  async clickYouTubeButton(): Promise<void> {
    try {
      await this.footerWrapper.waitFor({ state: 'visible', timeout: 5000 });
      await this.scrollToElement(this.footerWrapper);
      await this.youtubeButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.youtubeButton.click();
      
    } catch (error) {
      throw new Error(`Failed to click YouTube button: ${error}`);
    }
  }

  async getYouTubeLink(): Promise<string | null> {
    try {
      await this.youtubeButton.waitFor({ state: 'visible', timeout: 5000 });
      return await this.youtubeButton.getAttribute('href');
    } catch {
      return null;
    }
  }

  async isYouTubeButtonVisible(): Promise<boolean> {
    return await this.waitForElement(this.youtubeButton);
  }

  async scrollToFooter(): Promise<void> {
    await this.scrollToElement(this.footerWrapper);
  }
}
