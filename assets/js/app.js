// Ideate — site JS
//
// The topic pills are plain links to each topic's real archive page
// (/topics/<slug>/ — see _layouts/topic.html), which is deliberate: those
// pages are fully populated and crawlable, which matters for both visitors
// and AI/search crawlers doing GEO/SEO. An earlier draft of this file did
// client-side filtering of the homepage grid instead, but that broke for
// any topic whose only current article is the hero story rather than a
// grid card — real navigation doesn't have that gap, so that's what ships.
//
// Nothing needed on load right now. This file is here as the place to add
// future interactivity (e.g. a mobile nav toggle) without touching markup.
