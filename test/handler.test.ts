import { handleRequest } from '../src/handler';
import makeServiceWorkerEnv from 'service-worker-mock';

declare var global: any;

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  test('redirect to www.examind.io', async () => {
    const result = await handleRequest(
      new Request('/blog?foo=bar', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(
      'https://www.examind.io/blog?foo=bar',
    );
  });

  test("redirect /meet to Gonzo's calendar", async () => {
    const result = await handleRequest(new Request('/meet', { method: 'GET' }));
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(
      'https://meetings.hubspot.com/gonzo2',
    );
  });

  test("redirect /MeetGonzo to Gonzo's calendar", async () => {
    const result = await handleRequest(
      new Request('/MeetGonzo', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(
      'https://meetings.hubspot.com/gonzo2',
    );
  });

  test("redirect /meetbrad to Brad's calendar", async () => {
    const result = await handleRequest(
      new Request('/meetbrad', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(
      'https://meetings.hubspot.com/brad503',
    );
  });

  test("redirect /meetjohnny to Johnny's calendar", async () => {
    const result = await handleRequest(
      new Request('/meetjohnny', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(
      'https://meetings.hubspot.com/johnny125',
    );
  });

  test('return 405 for post request', async () => {
    const result = await handleRequest(new Request('/foo', { method: 'POST' }));
    expect(result.status).toEqual(405);
  });
});
