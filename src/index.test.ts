import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  vi,
} from 'vitest';
import { handleRequest } from '.';
import createFetchMock from 'vitest-fetch-mock';
import { REDIRECTS } from './config';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const mockRedirect = vi.fn(
  (url, status) =>
    new Response(null, {
      status: status,
      headers: { location: url },
    }),
);
global.Response.redirect = mockRedirect;

vi.spyOn(global, 'fetch').mockImplementation(
  // @ts-ignore
  (request: Request) =>
    // @ts-ignore
    Promise.resolve(
      // @ts-ignore
      new Response(null, { url: request.url.replace(/\/$/, '') }),
    ),
);

describe('Worker', () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev('src/index.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('Returns 405 for POST requests', async () => {
    const request = new Request('https://example.examind.io', {
      method: 'POST',
    });
    const response = await handleRequest(request);

    expect(response.status).toBe(405);
    expect(response.headers.get('content-type')).toBe(
      'text/html;charset=UTF-8',
    );

    const text = await response.text();
    expect(text).toContain('HTTP method POST not supported');
    expect(text).toContain('<style>');
  });

  // Test each redirect in the config
  Object.entries(REDIRECTS).forEach(([hostname, destinationUrl]) => {
    it(`Redirects ${hostname} to correct destination`, async () => {
      const request = new Request(`https://${hostname}/whatever`);
      const response = await handleRequest(request);

      expect(response.status).toBe(301);
      expect(response.headers.get('location')).toBe(destinationUrl);
    });
  });

  it('Forwards unknown domains to original URL', async () => {
    const request = new Request('https://unknown.examind.io');
    const response = await handleRequest(request);

    expect(response.url).toEqual('https://unknown.examind.io');
  });
});
