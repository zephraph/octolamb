// Webhook router
import { NowRequest, NowResponse } from "@now/node";
import { http, https } from "follow-redirects";
import { URL } from "url";

export = (request: NowRequest, response: NowResponse) => {
  const event = request.headers["x-github-event"];
  if (!event) return response.status(404).end();

  const url = new URL(`https://${request.headers.host}/${request.url}`);
  const [host, port] = request.headers.host?.split(":") ?? [];
  let connector = (process.env.NODE_ENV === "production" ? https : http).request(
    {
      host,
      port: port ? parseInt(port) : undefined,
      path: `${url.pathname}/${event}.ts`,
      headers: request.headers
    },
    forwardedResponse => forwardedResponse.pipe(response)
  );
  request.pipe(connector);
};
