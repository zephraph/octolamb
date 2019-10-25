import webhookNames from "@octokit/webhooks/lib/webhook-names.json";

type WebhookName = typeof webhookNames;

export const feature = (webhooks: typeof WebhookName) => {
  console.log(webhooks);
};
