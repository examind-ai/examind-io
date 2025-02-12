import { ROOT_REDIRECTS, PATH_REDIRECTS } from './config';

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return handleRequest(request);
  },
};

const errorHtml = (message: string) => `
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    div {
      color: #990000;
      font-weight: bold;
      font-family: sans-serif;
      font-size: 24px;
      height:100vh;
      display: grid;
      place-items: center;
    }
  </style>
  <body><div>${message}</div></body>
`;

// Create a separate handleRequest function so that it can be tested
export function handleRequest(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return Promise.resolve(
      new Response(
        errorHtml(`HTTP method ${request.method} not supported`),
        {
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
          status: 405,
        },
      ),
    );
  }

  const url = new URL(request.url);

  const rootRedirectUrl = ROOT_REDIRECTS[url.hostname];
  if (rootRedirectUrl)
    return Promise.resolve(Response.redirect(rootRedirectUrl, 301));

  const pathRedirectUrl = PATH_REDIRECTS[url.hostname];
  if (pathRedirectUrl) {
    const newUrl = `${pathRedirectUrl}${url.pathname}${url.search}`;
    return Promise.resolve(Response.redirect(newUrl, 301));
  }

  return fetch(request);
}
