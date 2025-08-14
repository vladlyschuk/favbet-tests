import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FavoritesPage extends BasePage {
  private readonly favoritesLink: Locator;
  private readonly eventContainers: Locator;

  constructor(page: Page) {
    super(page);
    
    this.favoritesLink = this.page.getByText('Обране', { exact: true });
    this.eventContainers = this.page.locator('[data-role^="event-id-"]');
  }

  async navigateToFavorites(): Promise<void> {
    await this.favoritesLink.click();
    await this.waitForPageLoad();
  }

  async waitForFavoritesPageContent(): Promise<void> {
    await this.page.waitForURL('**/favorites/**', { timeout: 10000 });

    try {
      await this.eventContainers.first().waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      // Ignore if the first event container is not visible
    }
  }

  async getMatchesCount(): Promise<number> {
    await this.waitForFavoritesPageContent();
    const count = await this.eventContainers.count();
    return count;
  }
  
  async waitAfterRemoval(expectedCount: number): Promise<void> {
    let currentCount = expectedCount;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (currentCount >= expectedCount && attempts < maxAttempts) {
      await this.page.waitForTimeout(200);
      currentCount = await this.eventContainers.count();
      attempts++;
    }
  }
  async removeMatchFromFavorites(index: number): Promise<void> {
    const events = await this.eventContainers.all();
    const favoriteStarIcon = events[index].locator('[data-role="event-favorite-star-icon"]');
    await favoriteStarIcon.waitFor({ state: 'visible', timeout: 5000 });
    const countBeforeRemoval = events.length;
    await favoriteStarIcon.click();
    await this.waitAfterRemoval(countBeforeRemoval);
  } 

  async removeAllMatchesFromFavorites(): Promise<number> {
    let removedCount = 0;
    
    let matchesCount = await this.getMatchesCount();
    while (matchesCount > 0 && removedCount < 10) { 
      await this.removeMatchFromFavorites(0); 
      removedCount++;
      const newCount = await this.getMatchesCount();
      if (newCount >= matchesCount) {
        break;
      }
      matchesCount = newCount;
    }
    
    return removedCount;
  }
}