import { ApiRequestBuilder } from './ApiRequestBuilder';

export class BonusApiBuilder extends ApiRequestBuilder {
  constructor() {
    super();
    this.url('https://www.favbet.ua/service/prewager/campaigns')
      .method('GET')
      .credentials('include')
      .header('Content-Type', 'application/json');
  }

  campaignId(id: number): BonusApiBuilder {
    const currentUrl = this.build().url;
    this.url(`${currentUrl}/${id}`);
    return this;
  }

  status(status: 'potential' | 'active' | 'completed' | 'expired'): BonusApiBuilder {
    const currentUrl = this.build().url;
    const separator = currentUrl.includes('?') ? '&' : '?';
    this.url(`${currentUrl}${separator}status=${status}`);
    return this;
  }

  limit(limit: number): BonusApiBuilder {
    const currentUrl = this.build().url;
    const separator = currentUrl.includes('?') ? '&' : '?';
    this.url(`${currentUrl}${separator}limit=${limit}`);
    return this;
  }

  offset(offset: number): BonusApiBuilder {
    const currentUrl = this.build().url;
    const separator = currentUrl.includes('?') ? '&' : '?';
    this.url(`${currentUrl}${separator}offset=${offset}`);
    return this;
  }
}

export function createBonusApiRequest(): BonusApiBuilder {
  return new BonusApiBuilder();
}
