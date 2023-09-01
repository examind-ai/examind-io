import { BOOK_DEMO, DOWNLOAD, STUDENT_HELP } from './constants';

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

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== 'GET')
    return new Response(
      errorHtml(`HTTP method ${request.method} not supported`),
      {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
        status: 405,
      },
    );

  const url = new URL(request.url);

  if (url.hostname === 'student-help.examind.io')
    return Response.redirect(STUDENT_HELP, 301);

  if (url.hostname === 'download.examind.io')
    return Response.redirect(DOWNLOAD, 301);

  switch (url.pathname.toLowerCase()) {
    case '/meet':
      return Response.redirect(BOOK_DEMO, 301);
    default:
      return Response.redirect(
        'https://www.examind.io' + url.pathname + url.search,
        301,
      );
  }
}
