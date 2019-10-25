import { NowRequest, NowResponse } from "@now/node";
import { webhook } from "../../lib/webhook";

export = webhook((_req: NowRequest, res: NowResponse) => {
  res.status(200).send("pong");
});
