/**
 * Ideate CMS auth proxy
 * ---------------------
 * GitHub Pages only serves static files — it can't hold a client secret or
 * run server code. Decap CMS's GitHub login still needs *something* to do
 * that exchange on the server side. This tiny Cloudflare Worker is that
 * something. It does exactly two things:
 *
 *   1. /auth      → redirects the login popup to GitHub's OAuth screen
 *   2. /callback  → exchanges GitHub's code for an access token, then hands
 *                   that token back to the CMS tab via postMessage
 *
 * It never sees your content, never touches your repo directly — GitHub
 * itself does the actual reading/writing, using the token this hands back.
 *
 * Full setup steps (creating the GitHub OAuth App, deploying this file,
 * setting secrets) are in DEPLOY.md. Don't hand-edit the client ID/secret
 * into this file — they're read from Worker secrets (env), never hardcoded.
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const authUrl = new URL(GITHUB_AUTHORIZE_URL);
      authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
      authUrl.searchParams.set("scope", "repo,user");
      authUrl.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing ?code from GitHub — try logging in again.", { status: 400 });
      }

      let tokenData;
      try {
        const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        });
        tokenData = await tokenResponse.json();
      } catch (err) {
        return renderMessagePage("error", { message: "Couldn't reach GitHub to exchange the code." });
      }

      if (tokenData.error) {
        return renderMessagePage("error", { message: tokenData.error_description || tokenData.error });
      }

      return renderMessagePage("success", { token: tokenData.access_token, provider: "github" });
    }

    return new Response("Ideate CMS auth proxy is running. This URL isn't meant to be visited directly.", { status: 200 });
  },
};

// Implements the handshake Decap CMS's core expects from an external OAuth
// provider: the popup waits for the opener to say hello, then replies with
// the real payload. This exact message shape (`authorization:github:...`)
// is part of Decap's (and originally Netlify CMS's) documented protocol —
// don't change the string format even though it looks unusual.
function renderMessagePage(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!DOCTYPE html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
