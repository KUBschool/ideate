# Deploying Ideate — a complete, first-timer's walkthrough

This gets you from "a folder of files" to a live site at a `github.io`
address, with a working `/admin` login. Budget about an hour the first
time, most of it waiting for things to finish rather than doing anything
tricky. Nothing here requires the command line, though a couple of steps
are easier with it if you're willing.

---

## What you'll end up with

- A live website, rebuilding automatically every time you or a co-editor
  saves a change.
- A `/admin` page where an editor logs in with their **GitHub account**
  and gets a proper editing interface — no separate password to manage.
- One small piece of code living outside GitHub Pages (because GitHub
  Pages can't run server code), which only exists to make that login work.

---

## Step 1 — Create the repository

1. Go to [github.com/new](https://github.com/new).
2. Name it something like `ideate` (the name becomes part of your URL
   unless you set up a custom domain later — see Step 3).
3. Set it to **Public**. (GitHub Pages on a free account requires a public
   repo, unless your organization has GitHub Enterprise.)
4. Don't check "Add a README" — you already have one.
5. Click **Create repository**.

## Step 2 — Get these files into it

**Easiest option: GitHub Desktop.** Install
[desktop.github.com](https://desktop.github.com), sign in, choose
"Add an Existing Repository from your Hard Drive," point it at this
folder, then click **Publish repository** (make sure it's pointing at the
repo you just created, not creating a new one). It'll upload everything,
folders included.

**If you're comfortable with a terminal**, from inside this folder:

```bash
git init
git add .
git commit -m "Initial Ideate site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Either way, refresh your repo's GitHub page afterward — you should see all
the folders (`_articles`, `_layouts`, `admin`, and so on).

## Step 3 — Turn on GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source** to "Deploy from a branch."
3. Set **Branch** to `main` and the folder to `/ (root)`, then **Save**.
4. GitHub will build the site (takes 1–2 minutes) and show you a URL —
   something like `https://your-username.github.io/ideate/`.

**If your URL has a path after `.io/`** (a "project page," like the
example above) rather than being the bare `your-username.github.io`
root, open `_config.yml` and change:

```yaml
baseurl: "/ideate"    # match your actual repo name
```

Every link and asset on the site uses Jekyll's `relative_url` filter, so
this one line is genuinely the only change needed — you don't need to
touch any template.

**If you're pointing a real custom domain at this** (e.g.
`research.business.ku.edu`), that's a DNS change your IT team makes (a
CNAME record), plus adding that domain under Settings → Pages → Custom
domain. Leave `baseurl` blank in that case and set `url:` in `_config.yml`
to the real domain.

At this point: **the site is live.** Nothing is editable yet through a
browser — that's the next part.

---

## Step 4 — Set up the login piece

This is the part that's a little more involved, because GitHub Pages
can't run the server-side half of a "log in with GitHub" flow. You're
going to create a GitHub OAuth App (a few clicks) and deploy one small
file to Cloudflare Workers (also free, no credit card required).

### 4a. Create a GitHub OAuth App

1. Go to **github.com/settings/developers** → **OAuth Apps** → **New OAuth App**.
2. Fill in:
   - **Application name**: `Ideate CMS`
   - **Homepage URL**: your site's URL from Step 3
   - **Authorization callback URL**: you'll fill this in after Step 4b —
     for now, put a placeholder like `https://example.com/callback`
3. Click **Register application**.
4. You'll see a **Client ID** — copy it somewhere.
5. Click **Generate a new client secret** — copy that too. Treat it like a
   password; don't commit it into the repo anywhere.

### 4b. Deploy the auth proxy to Cloudflare Workers

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Create Worker**.
3. Give it a name (e.g. `ideate-cms-auth`) → **Deploy** (it'll deploy a
   placeholder first — that's fine).
4. Click **Edit code**, delete the placeholder, and paste in the contents
   of this repo's `oauth-proxy/worker.js`. Click **Deploy**.
5. Go to the Worker's **Settings → Variables and Secrets** → **Add**:
   - `GITHUB_CLIENT_ID` → paste the Client ID from Step 4a
   - `GITHUB_CLIENT_SECRET` → paste the Client Secret from Step 4a
   - Make sure both are set as **Secret** (encrypted), not plain text.
6. Note the Worker's URL, shown at the top of its page — something like
   `https://ideate-cms-auth.your-subdomain.workers.dev`.

### 4c. Connect the two

1. Back in your GitHub OAuth App settings (4a), edit the **Authorization
   callback URL** to: `https://ideate-cms-auth.your-subdomain.workers.dev/callback`
   (your actual Worker URL + `/callback`). Save.
2. In this repo, open `admin/config.yml` and edit:

   ```yaml
   backend:
     name: github
     repo: your-username/your-repo-name        # your actual repo
     branch: main
     base_url: https://ideate-cms-auth.your-subdomain.workers.dev
   ```

3. Commit and push that change (through GitHub Desktop, or `git add`,
   `git commit`, `git push` on the command line).

### Alternative: Netlify for auth only

If you'd rather not touch Cloudflare at all: create a free Netlify account,
"Import an existing project" pointed at this same GitHub repo, and let it
deploy. Netlify auto-detects Decap/Netlify CMS and can act as the OAuth
provider with a couple of dashboard clicks (Site settings → Identity, or
their documented external OAuth setup), no code to write or deploy
yourself. You'd then use Netlify's site URL as `base_url` in
`admin/config.yml` instead of a Worker URL. **Your live site still stays
on GitHub Pages either way** — Netlify's copy of the deploy is just there
to answer login requests. This trades "one more account, zero code" for
"one small file to deploy," which is worth it for some people and not
others.

---

## Step 5 — Log in and make your first edit

1. Go to `https://your-site-url/admin`.
2. Click **Login with GitHub**. A popup opens, GitHub asks you to
   authorize the OAuth App, and the popup closes on its own.
3. You should see the Decap CMS interface with an "Articles" collection
   and a "Site Settings" collection.
4. Try editing the "Just Announced Banner" under Site Settings, save it,
   and watch your live site update in a minute or two (GitHub Pages
   rebuilds on every save, whether it comes from the CMS or a manual push).

**Who can log in?** Anyone with write access to the GitHub repo — add
co-editors under **Settings → Collaborators** in the repo, same as any
other GitHub project. There's no separate CMS user list to maintain.

---

## Troubleshooting

- **"Login with GitHub" does nothing / popup closes with an error** —
  double check the callback URL in the GitHub OAuth App *exactly* matches
  `<your-worker-url>/callback`, including `https://` and no trailing slash
  mismatch.
- **Site builds but looks unstyled** — almost always a `baseurl` mismatch
  (Step 3). Check the CSS `<link>` tag's actual URL in your browser's
  "View Page Source" against where the file really lives.
- **A new article doesn't show up** — check its `date` isn't in the
  future; Jekyll's default behavior only publishes dated content up to
  "now" (this is a `_articles` custom collection rather than Jekyll's
  built-in `_posts`, so this specific restriction may not apply the same
  way — if a future-dated article isn't appearing and you want it to,
  that's the first thing to check).
- **GitHub Pages build fails** — check the **Actions** tab in your repo
  for the error; the most common cause is a YAML front-matter typo (a
  missing colon or quote) in one of the `_articles/*.md` files.

---

## What's next (not built into this repo yet)

- **Real photos** in place of the tinted placeholder blocks — upload
  through the CMS's media picker (it writes to `assets/uploads/`) or drop
  files in directly.
- **Real logos** — replace the text wordmark in `_includes/header.html`
  and `_includes/footer.html` with an `<img>` once you have KU Business
  and Ideate logo files.
- **Halyard + Freight Pro fonts** — swap the Google Fonts `@import` at the
  top of `assets/css/style.css` for your Adobe Fonts web-project kit URL
  once your team has (or grants access to) one for this domain.
- **Analytics + human-vs-AI traffic split + GEO scoring dashboard** — the
  architecture for this was scoped earlier (a small logging function
  alongside the OAuth proxy, checking User-Agent against the current
  AI-crawler list) but isn't built yet. Good next piece once the base site
  is live and you're comfortable with the deploy flow.
- **Wiring the AI-assisted draft button into the real CMS** — the Story
  Editor prototype demonstrates the UX; making the "Generate" button work
  inside `/admin` for real means adding one more small serverless function
  (same shape as the OAuth proxy) that the CMS's `answer_box` field calls
  out to.
