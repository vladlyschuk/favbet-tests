import { Page, test, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly snackbarCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.emailField = this.page.getByRole('textbox', { name: 'Електронна пошта' });
    this.passwordField = this.page.getByRole('textbox', { name: 'Пароль' });
    this.loginButton = this.page.getByRole('button', { name: 'Увійти' });
    this.snackbarCloseButton = this.page.getByTestId('icon-notification-close');
  }

  async openLoginPage(): Promise<void> {
    await test.step('Open login page', async () => {
      await this.page.goto('/uk/login/');
      await this.waitForLoginForm();
    });
  }

  async login(email: string, password: string): Promise<void> {
    await test.step('Login with credentials', async () => {
      await this.emailField.fill(email);
      await this.passwordField.fill(password);
      await this.loginButton.click();
      await this.snackbarCloseButton.waitFor({ state: 'visible', timeout: 3000 });
      await this.snackbarCloseButton.click();
    });
  }

  async waitForLoginForm(): Promise<void> {
    await test.step('Wait for login form to be visible', async () => {
      await this.emailField.waitFor({ state: 'visible' });
      await this.passwordField.waitFor({ state: 'visible' });
      await this.loginButton.waitFor({ state: 'visible' });
    });
  }
}
