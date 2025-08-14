import { Page, test, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { FooterComponent } from '../components/FooterComponent';
import { UserMenuComponent } from '../components/UserMenuComponent';

export interface MatchInfo {
  id: string;
  title: string;
  homeTeam: string;
  awayTeam: string;
  starIcon: Locator;
}

export class LivePage extends BasePage {
  public footerComponent: FooterComponent;
  public userMenuComponent: UserMenuComponent;
  private readonly liveLink: Locator;
  private readonly matchesSoccerContainer: Locator;


  constructor(page: Page) {
    super(page);
    
    this.liveLink = this.page.getByText('Live', { exact: true });
    this.matchesSoccerContainer = this.page.getByTestId('soccer');
    this.footerComponent = new FooterComponent(page);
    this.userMenuComponent = new UserMenuComponent(page); 
  }

  async navigateToLive(): Promise<void> {
    await test.step('Navigate to Live page', async () => {
      try {
        await this.page.locator('#notifications img').click({ timeout: 2000 });
      } catch (error) {
        // Ignore if snackbar is not present
      }
      
      await this.liveLink.click();
      await this.page.waitForURL('**/live/**', { timeout: 10000 });
    });
  }

  async getAvailableMatches(limit?: number): Promise<MatchInfo[]> {
    return await test.step('Get available matches on Live page', async () => {
      await this.matchesSoccerContainer.waitFor({ state: 'visible' });
      await this.page.waitForTimeout(2000);
      const eventContainers = this.page.locator('[data-role^="event-id-"]');
      const count = limit ? Math.min(limit, await eventContainers.count()) : await eventContainers.count();
      
      const matches: MatchInfo[] = [];
      
      for (let i = 0; i < count; i++) {
        const eventContainer = eventContainers.nth(i);
        const eventId = await eventContainer.getAttribute('data-role');
        const matchId = eventId?.replace('event-id-', '') || `match-${i + 1}`;
        const participantsContainer = eventContainer.locator('[data-role*="event-participants-name"]');
        const teamElements = participantsContainer.locator('.Qo3Gx span'); // need to refactor this locator
        
        let homeTeam = '';
        let awayTeam = '';
        
        if (await teamElements.count() >= 2) {
          homeTeam = await teamElements.nth(0).innerText();
          awayTeam = await teamElements.nth(1).innerText();
        }
        

        const starIcon = eventContainer.getByTestId('event-favorite-star-icon');
        
        matches.push({
          id: matchId,
          title: `${homeTeam} - ${awayTeam}`,
          homeTeam,
          awayTeam,
          starIcon
        });
      }
      
      return matches;
    });
  }

  async addMatchToFavorites(match: MatchInfo): Promise<void> {
    await test.step(`Add match "${match.title}" to favorites`, async () => {
      if (match.starIcon && await match.starIcon.isVisible()) {
        await match.starIcon.click();
      }
    });
  }
}
