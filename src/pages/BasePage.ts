import { Page } from '@playwright/test';

export class BasePage {
  protected readonly url: string = '/';

  constructor(protected page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (error) {
      try {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      } catch (e) {
        // Ignore if page is already loaded or closed
      }
    }
  }
}
