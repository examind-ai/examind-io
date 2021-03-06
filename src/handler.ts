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
  switch (url.pathname.toLowerCase()) {
    case '/meet':
      return Response.redirect('https://meetings.hubspot.com/gonzo2', 301);
    case '/meetgonzo':
      return Response.redirect('https://meetings.hubspot.com/gonzo2', 301);
    case '/meetbrad':
      return Response.redirect('https://meetings.hubspot.com/brad503', 301);
    case '/meetjohnny':
      return Response.redirect('https://meetings.hubspot.com/johnny125', 301);
    default:
      return Response.redirect(
        'https://www.examind.io' + url.pathname + url.search,
        301,
      );
  }
}
