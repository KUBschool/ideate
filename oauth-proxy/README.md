# Ideate CMS auth proxy

This folder is **not part of the website** — it's a separate, tiny piece of
server code that makes the "log in with GitHub" button on `/admin` actually
work. GitHub Pages can only serve static files, so this one piece has to
live somewhere else. Cloudflare Workers is the easiest free option that
doesn't require a credit card.

Full step-by-step is in the main `DEPLOY.md`, under "Set up the login
piece." Short version once you're comfortable with it:

1. Create a GitHub OAuth App at github.com/settings/developers.
   - Homepage URL: your site's URL
   - Authorization callback URL: `https://<your-worker-name>.<your-subdomain>.workers.dev/callback`
2. Create a Cloudflare account (free) → Workers & Pages → Create Worker.
3. Paste in `worker.js`.
4. Add two secrets to the Worker (Settings → Variables → Encrypt):
   - `GITHUB_CLIENT_ID` — from the OAuth App you just made
   - `GITHUB_CLIENT_SECRET` — from the same OAuth App
5. Copy the Worker's `*.workers.dev` URL into `admin/config.yml`, as
   `base_url`.

That's it — nothing here talks to your repo directly. It only ever
brokers the login handshake; GitHub itself does all the actual reading
and writing once the CMS has a token.

**If you'd rather not stand up a Worker at all:** see the "Alternative:
Netlify for auth only" section in `DEPLOY.md` — it trades a small amount
of setup here for a few clicks in a different dashboard, keeping GitHub
Pages as the actual host either way.
