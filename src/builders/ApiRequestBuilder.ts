export interface ApiRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  credentials?: 'omit' | 'same-origin' | 'include';
  body?: string;
}

export class ApiRequestBuilder {
  private request: ApiRequest;

  constructor() {
    this.request = {
      url: '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  url(url: string): ApiRequestBuilder {
    this.request.url = url;
    return this;
  }

  method(method: string): ApiRequestBuilder {
    this.request.method = method;
    return this;
  }

  header(key: string, value: string): ApiRequestBuilder {
    this.request.headers[key] = value;
    return this;
  }

  headers(headers: Record<string, string>): ApiRequestBuilder {
    this.request.headers = { ...this.request.headers, ...headers };
    return this;
  }

  credentials(credentials: 'omit' | 'same-origin' | 'include'): ApiRequestBuilder {
    this.request.credentials = credentials;
    return this;
  }

  body(body: any): ApiRequestBuilder {
    this.request.body = typeof body === 'string' ? body : JSON.stringify(body);
    return this;
  }

  async execute(page: any): Promise<any> {
    return await page.evaluate(async (requestData: ApiRequest) => {
      const { url, method, headers, credentials, body } = requestData;
      
      const fetchOptions: any = {
        method,
        headers,
      };

      if (credentials) {
        fetchOptions.credentials = credentials;
      }

      if (body && method !== 'GET') {
        fetchOptions.body = body;
      }

      const response = await fetch(url, fetchOptions);
      return response.json();
    }, this.request);
  }

  build(): ApiRequest {
    return { ...this.request };
  }
}

export function createApiRequest(): ApiRequestBuilder {
  return new ApiRequestBuilder();
}
