# Setting up the Subscribe page

The `/subscribe/` page embeds a Qualtrics survey (KU's licensed survey
platform) directly in the page via an iframe, rather than routing through
a third-party form service. That means:

- No separate account to manage (Formspree is no longer used here).
- No Cloudflare piece for this feature specifically.
- Every submission lands directly in Qualtrics's own response table,
  with native CSV/Excel export and optional notification emails —
  Qualtrics already does what a custom "Subscribers" admin panel and
  export button would have had to be built to do.

## The current survey

```
https://kusurvey.ca1.qualtrics.com/jfe/form/SV_2nxphXnVFte5i6i
```

This is the survey's **anonymous link** (found under the survey's
Distributions tab in Qualtrics) — the correct link to use for an
external embed like this. It's embedded in `subscribe.html` via a plain
`<iframe>`.

## If you ever need to change the survey

If you rebuild the survey (rather than just editing questions within the
existing one), Qualtrics will give it a new anonymous link. To swap it
in, update **both** places it appears in `subscribe.html`: the iframe's
`src` and the "Open it in a new tab instead" fallback link right below
it. Editing questions on the *existing* survey — adding an update-type
option, tweaking wording — doesn't change the link at all, so most
day-to-day edits need no change here.

## Getting subscriber data into Emma

In Qualtrics: **Data & Analysis → Export & Import → Export Data → CSV**.
That gives you every response — name, email, and whichever update types
were checked — ready to import into Emma. You can also turn on
**Survey Notifications** in Qualtrics (Survey → Notifications) to get an
email at bschoolcomms@ku.edu for each new response, if you want both the
running response table and the per-signup email.

## On the fixed height

The iframe uses a fixed height (700px) rather than auto-resizing to the
survey's content. That's the simplest reliable option for a plain
anonymous-link embed, and it's fine as long as the survey stays roughly
its current length (name, email, one multi-select question). If the
survey grows substantially, or you want a perfectly seamless fit with no
inner scrollbar, Qualtrics's **Website / App Feedback** project type has
a "Responsive Dialog" option that auto-resizes the embed to match the
content — a bigger setup step inside Qualtrics, but still no external
dependency beyond Qualtrics itself. Worth revisiting if the current
fixed height ever feels cramped or leaves obvious empty space.

## One thing worth confirming with your Qualtrics admin

Some university Qualtrics deployments restrict which external domains
are allowed to embed a survey via iframe, as a clickjacking protection.
If the embed ever shows blank instead of the survey, that's the first
thing to check — confirm with whoever administers KU's Qualtrics license
that this site's domain is allowed to frame surveys.

## What happened to the old Formspree setup

The `_subscribed/` "You're all set" confirmation page from the previous
Formspree flow is no longer linked from anywhere — Qualtrics shows its
own end-of-survey message inside the same iframe once someone submits,
so there's no separate redirect happening. The page still exists in the
repo; it's just unused now. Safe to delete if you want, or leave it —
either way it costs nothing sitting there.
