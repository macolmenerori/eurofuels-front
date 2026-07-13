import { renderToReadableStream } from 'react-dom/server';
import type { EntryContext, RouterContextProvider } from 'react-router';
import { ServerRouter } from 'react-router';

import { isbot } from 'isbot';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _loadContext: RouterContextProvider
): Promise<Response> {
  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );

  if (isbot(request.headers.get('user-agent') ?? '')) {
    await stream.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
