import {
  DOWNLOAD,
  MEET_BRAD,
  MEET_GONZO,
  MEET_JOHNNY,
  MEET_MARK,
  STUDENT_HELP,
} from '../src/constants';
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
    expect(result.headers.get('Location')).toEqual(MEET_GONZO);
  });

  test("redirect /MeetGonzo to Gonzo's calendar", async () => {
    const result = await handleRequest(
      new Request('/MeetGonzo', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(MEET_GONZO);
  });

  test("redirect /meetbrad to Brad's calendar", async () => {
    const result = await handleRequest(
      new Request('/meetbrad', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(MEET_BRAD);
  });

  test("redirect /meetjohnny to Johnny's calendar", async () => {
    const result = await handleRequest(
      new Request('/meetjohnny', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(MEET_JOHNNY);
  });

  test("redirect /meetmark to Mark's calendar", async () => {
    const result = await handleRequest(
      new Request('/meetmark', { method: 'GET' }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(MEET_MARK);
  });

  test('redirect student-help.examind.io to student help page', async () => {
    const result = await handleRequest(
      new Request('https://student-help.examind.io/', {
        method: 'GET',
      }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(STUDENT_HELP);
  });

  test('redirect student-help.examind.io/anything to student help page', async () => {
    const result = await handleRequest(
      new Request('https://student-help.examind.io/anything', {
        method: 'GET',
      }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(STUDENT_HELP);
  });

  test('redirect download.examind.io to LeadPages landing page', async () => {
    const result = await handleRequest(
      new Request('https://download.examind.io/', {
        method: 'GET',
      }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(DOWNLOAD);
  });

  test('redirect download.examind.io/anything to LeadPages landing page page', async () => {
    const result = await handleRequest(
      new Request('https://download.examind.io/anything', {
        method: 'GET',
      }),
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get('Location')).toEqual(DOWNLOAD);
  });

  test('return 405 for post request', async () => {
    const result = await handleRequest(new Request('/foo', { method: 'POST' }));
    expect(result.status).toEqual(405);
  });
});
