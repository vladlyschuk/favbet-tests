import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class FooterComponent extends BaseComponent {
  private readonly footerWrapper: Locator;
  private readonly youtubeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Основной контейнер футера
    this.footerWrapper = this.page.locator('[data-role="footer-rows-wrapper"]');
    
    // Кнопка YouTube в футере
    this.youtubeButton = this.footerWrapper.locator('a[href*="youtube.com"]');
  }

  // Проверка видимости футера
  async isVisible(): Promise<boolean> {
    return await this.waitForElement(this.footerWrapper);
  }

  // Клик по кнопке YouTube
  async clickYouTubeButton(): Promise<void> {
    try {
      // Убеждаемся, что футер видим
      await this.footerWrapper.waitFor({ state: 'visible', timeout: 5000 });
      
      // Скроллим к футеру, если он не в видимой области
      await this.scrollToElement(this.footerWrapper);
      
      // Ждем появления кнопки YouTube
      await this.youtubeButton.waitFor({ state: 'visible', timeout: 5000 });
      
      // Кликаем по кнопке YouTube
      await this.youtubeButton.click();
      
    } catch (error) {
      throw new Error(`Failed to click YouTube button: ${error}`);
    }
  }

  // Получение ссылки на YouTube
  async getYouTubeLink(): Promise<string | null> {
    try {
      await this.youtubeButton.waitFor({ state: 'visible', timeout: 5000 });
      return await this.youtubeButton.getAttribute('href');
    } catch {
      return null;
    }
  }

  // Проверка наличия кнопки YouTube
  async isYouTubeButtonVisible(): Promise<boolean> {
    return await this.waitForElement(this.youtubeButton);
  }

  // Скролл к футеру
  async scrollToFooter(): Promise<void> {
    await this.scrollToElement(this.footerWrapper);
  }
}
