# Ideate — KU School of Business research site

A Jekyll site, built to deploy on GitHub Pages, with Decap CMS wired up so
editors log in with their GitHub account to add and edit content — no
separate CMS login, no database to manage.

**New here? Start with [`DEPLOY.md`](DEPLOY.md)** — it's the step-by-step
guide to actually getting this live, written for someone doing this for
the first time.

## What's in this repo

```
_config.yml          Site settings, including the on/off switches for
                      podcasts/webinars/video (`sections:`)
_data/                Editable structured content: topics, the "just
                      announced" banner, faculty/school recognition strip
_layouts/             default (site chrome) → article, topic
_includes/            header, topic nav, announcement banner, footer,
                      article-card partial
_articles/            One markdown file per research story — this is
                      almost certainly what you'll spend the most time in
topics/               10 tiny files (one per topic) that generate each
                      topic's archive page — see _data/topics.yml first
assets/               CSS, JS, and where uploaded images live
admin/                Decap CMS — the actual editing interface, at /admin
oauth-proxy/          The small separate piece that makes GitHub login work
                      (GitHub Pages can't run this part itself)
articles.html         Full chronological archive of every story
about.html            About page
```

## Adding a new article (without the CMS)

Copy any file in `_articles/`, rename it `YYYY-MM-DD-your-slug.md`, and
edit the front matter — the fields are documented inline in
`admin/config.yml`. This is exactly what the CMS does under the hood.

## Adding a new topic

1. Add an entry to `_data/topics.yml`.
2. Copy any file in `topics/`, rename it `<slug>.html`, update `topic:` and
   `permalink:` in its front matter.
3. Add a matching `--topic-<slug>` CSS variable in `assets/css/style.css`
   (search for `--topic-` to find the others).
4. Add the option to the `topic` field in `admin/config.yml` so editors can
   pick it in the CMS.

## Turning on podcasts, webinars, or video

Flip the relevant value in `_config.yml` under `sections:` to `true`. The
nav link and homepage section activate automatically. You'll still want to
build out a real landing page/layout for that content type when the time
comes — this just removes the "coming soon" state.

## Where the real content already here came from

Every article currently in `_articles/` is a real KU Business research
story, rewritten in Ideate's voice from `business.ku.edu/news`, with real
faculty linked to their actual `business.ku.edu/people/...` profiles. None
of the original article text is reproduced — each includes a "Source"
link back to what it's based on. `Business Law` has no article yet; that's
a real content gap (see `_data/topics.yml`), not a placeholder.

## The AI-assisted drafting workflow

The `answer_box` field on every article (shown in `admin/config.yml`) is
meant to be filled in with an AI-generated draft that a publisher then
edits before saving — see the separate Story Editor prototype for what
that flow looks like. That prototype calls the Anthropic API directly from
the browser and only works inside a Claude.ai artifact; wiring the same
"Generate" button into this CMS for real means adding one more small
serverless function alongside the OAuth proxy, which `DEPLOY.md` notes as
a clear next step rather than something built into this repo yet.
