import { NowRequest, NowResponse } from "@now/node";
import verify from "@octokit/webhooks/verify";

type WebhookAction = (req: NowRequest, res: NowResponse) => void;

export const webhook = (action: WebhookAction) => {
  return (req: NowRequest, res: NowResponse) => {
    if (!verify(process.env.GH_SECRET as string, req.body, req.headers["x-hub-signature"] as string)) {
      res.send(401).end();
    } else {
      action(req, res);
    }
  };
};
