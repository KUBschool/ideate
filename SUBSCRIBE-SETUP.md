# Setting up the Subscribe page

The `/subscribe/` page collects name, email, and update preferences, and
needs to send that to **bschoolcomms@ku.edu** as an email you can copy
into Emma. GitHub Pages can't send email on its own — it only serves
static files — so this uses **Formspree**, a hosted service built for
exactly this (a real HTML form on a static site, emailed to you, no
backend code to write or host). It's the same category of tool an
official Cloudflare Pages tutorial recommends for this scenario.

## 1. Create a Formspree account and form

1. Go to [formspree.io](https://formspree.io) and sign up (free).
2. Create a new form (call it something like "Ideate Subscribe").
3. In that form's settings, add **bschoolcomms@ku.edu** as a notification
   email. Formspree will send a one-time verification link to that
   inbox — someone with access to it needs to open the email and click
   the link once. Until that happens, submissions won't be delivered
   there.
4. Copy the form's endpoint URL — it looks like
   `https://formspree.io/f/abcdwxyz`.

## 2. Connect it to the site

Open `subscribe.html` and replace this line:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="subscribe-form">
```

with your real endpoint:

```html
<form action="https://formspree.io/f/abcdwxyz" method="POST" class="subscribe-form">
```

That's the only edit required. Commit and push — the next time GitHub
Pages rebuilds, the form is live.

## 3. Test it

Submit the form yourself with a real email address you can check. You
should:
- Land on the "You're all set" confirmation page (`/subscribed/`)
- See an email arrive at bschoolcomms@ku.edu within a minute or two,
  showing the name, email, and whichever update types were checked

## What each submission looks like

Formspree emails you the raw field values. With the field names used on
this form, that reads as:

```
Full Name: Jane Doe
email: jane@example.com
Updates: New articles, School of Business updates
```

That's the "new subscriber record" — copy the relevant fields into Emma
when you do the manual import.

## Free plan limits, so there are no surprises

Formspree's free tier includes 50 submissions per month, unlimited
forms, and 30 days of submission history — plenty for typical newsletter
signup volume. If a promotion or event ever pushes you past that in a
given month, Formspree emails you a warning at 50/75/90% of the limit
before anything gets dropped, and upgrading is a plan change in their
dashboard, not a code change here.

## Spam protection

Two layers are already built into the form:
- A hidden "honeypot" field (`_gotcha`) — invisible to real visitors,
  but bots that blindly fill in every field trip it, and Formspree
  silently discards those submissions.
- Formspree's own built-in spam filtering on top of that.

If spam still gets through in practice, Formspree's dashboard has
additional filtering options (including reCAPTCHA) you can turn on
without touching this site's code.
