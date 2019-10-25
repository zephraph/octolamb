declare module "@octokit/webhooks/verify" {
  export default function(secret: string, payload: object, signature: string): boolean;
}
