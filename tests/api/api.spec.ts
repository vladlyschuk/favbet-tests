import { test, expect } from '../../src/fixtures/ui-fixtures';
import { createBonusApiRequest } from '../../src/builders/BonusApiBuilder';


// should I use window.isAutomationTestRun?


test.describe('API Tests - Bonuses', () => {
  test('Should fetch accurate list of bonuses', async ({ page }) => {
    
    const apiResponse = await createBonusApiRequest()
      .execute(page);

    expect(apiResponse).toBeDefined();
    expect(apiResponse.status).toBe('success');
    expect(apiResponse.data).toBeDefined();

    const data = apiResponse.data;
    expect(typeof data.totalCount).toBe('number');
    expect(data.totalCount).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(data.campaigns)).toBeTruthy();
    expect(data.campaigns.length).toBe(data.totalCount);

    if (data.campaigns.length > 0) {
      console.log(`Validating ${data.campaigns.length} bonus campaigns...`);
      
      data.campaigns.forEach((campaign: any, index: number) => {
        console.log(`Validating campaign ${index + 1}: "${campaign.campaignName}"`);
        expect(campaign.campaignId).toBeDefined();
        expect(typeof campaign.campaignId).toBe('number');
        
        expect(campaign.bonusId).toBeDefined();
        expect(typeof campaign.bonusId).toBe('number');
        
        expect(campaign.campaignName).toBeDefined();
        expect(typeof campaign.campaignName).toBe('string');
        expect(campaign.campaignName.length).toBeGreaterThan(0);
        
        expect(campaign.status).toBeDefined();
        expect(['potential', 'active', 'completed', 'expired']).toContain(campaign.status);
        
        expect(campaign.bonusType).toBeDefined();
        expect(typeof campaign.bonusType).toBe('string');
        expect(typeof campaign.startedAtTimestamp).toBe('number');
        expect(typeof campaign.endedAtTimestamp).toBe('number');

        expect(campaign.endedAtTimestamp).toBeGreaterThan(campaign.startedAtTimestamp);
        expect(campaign.currency).toBeDefined();
        expect(campaign.currency.currency).toBeDefined();
        expect(typeof campaign.currency.currency).toBe('string');

        expect(campaign.triggerType).toBeDefined();
        expect(typeof campaign.wagerMultiplier).toBe('number');

        expect(campaign.wagerMultiplier).toBeGreaterThanOrEqual(0);
        
        if (campaign.type) {
          expect(Array.isArray(campaign.type)).toBeTruthy();
        }
      });
    }
  });

  test('Should send analytics event for adding favorite', async ({ page }) => {
    const testResponse = await page.evaluate(async () => {
      const eventRequest = {
        "jsonrpc": "2.0",
        "id": 300,
        "method": "frontend/event/get",
        "params": {
          "by": {
            "lang": "uk",
            "sport_id": 1,
            "head_markets": true,
            "service_id": 1,
            "margin_group_id": 0
          }
        }
      };

      const response = await fetch('https://www.favbet.ua/service/lineout/frontend_api2', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7,pl;q=0.6',
          'content-type': 'application/json',
          'origin': 'https://www.favbet.ua',
          'referer': 'https://www.favbet.ua/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site'
        },
        body: JSON.stringify(eventRequest)
      });

      return {
        status: response.status,
        statusText: response.statusText,
        data: await response.json()
      };
    });

    console.log('Event data response:', testResponse);
    console.log('Event ID response:', testResponse.data.result[0].event_id);

    const eventId = testResponse.data.result[0].event_id;

    const analyticsResponse = await page.evaluate(async (args) => {
      const { eventFavouriteAddType, eventId } = args;
      const eventData = {
        "api_key": "a3090151ddd106cd8a27b32071f9fa52",
        "events": [{
          "user_id": 103322055,
          "device_id": "be370764-6b1d-400b-9d1f-61e563f063e3",
          "session_id": 1754553683644,
          "time": Date.now(),
          "platform": "Web",
          "language": "en-US",
          "ip": "$remote",
          "insert_id": crypto.randomUUID(),
          "event_type": eventFavouriteAddType,
          "event_properties": {
            "event_id": eventId.toString(),
          },
          "event_id": 79,
          "library": "amplitude-ts/2.15.0",
          "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
        }],
        "options": {},
        "client_upload_time": new Date().toISOString(),
        "request_metadata": {
          "sdk": {
            "metrics": {
              "histogram": {}
            }
          }
        }
      };

      const response = await fetch('https://api2.amplitude.com/2/httpapi', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7,pl;q=0.6',
          'content-type': 'application/json',
          'origin': 'https://www.favbet.ua',
          'referer': 'https://www.favbet.ua/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site'
        },
        body: JSON.stringify(eventData)
      });

      return {
        status: response.status,
        statusText: response.statusText,
        data: await response.json()
      };
    }, { eventFavouriteAddType: "fe.sportsbook.favourite.add", eventId });

    console.log('Analytics event response:', analyticsResponse);

    expect(analyticsResponse.status).toBe(200);
    expect(analyticsResponse.data).toBeDefined();


    const eventDataResponse = await page.evaluate(async () => {
      const eventRequest = {
        "jsonrpc": "2.0",
        "id": 300,
        "method": "frontend/event/get",
        "params": {
          "by": {
            "lang": "uk",
            "head_markets": true,
            "service_id": 1,
          }
        }
      };

      const response = await fetch('https://www.favbet.ua/service/lineout/frontend_api2/', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,uk;q=0.8,ru;q=0.7,pl;q=0.6',
          'content-type': 'application/json',
          'origin': 'https://www.favbet.ua',
          'referer': 'https://www.favbet.ua/uk/live/all/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-device-id': 'fbd64716950aa4e011a8e50165f6cf91'
        },
        credentials: 'include',
        body: JSON.stringify(eventRequest)
      });

      return {
        status: response.status,
        statusText: response.statusText,
        data: await response.json()
      };
    });

    console.log('Event data response:', eventDataResponse);
  });
});
