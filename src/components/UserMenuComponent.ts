import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class UserMenuComponent extends BaseComponent {
  private readonly userButton: Locator;
  private readonly userMenuWrapper: Locator;
  private readonly settingsLink: Locator;

  constructor(page: Page) {
    super(page);
    
    this.userButton = this.page.getByTestId('c-user');
    this.userMenuWrapper = this.page.getByTestId('user-menu-wrapper');
    this.settingsLink = this.userMenuWrapper.getByTestId('user-menu-item-settings-toggle');
  }

  async openUserMenu(): Promise<void> {
    await this.userButton.click();
    await this.userMenuWrapper.waitFor({ state: 'visible', timeout: 5000 });
  }

  async navigateToSettings(): Promise<void> {
    await this.settingsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.settingsLink.click();
  }
}
