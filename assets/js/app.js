// Ideate — site JS
//
// The topic pills are plain links to each topic's real archive page
// (/topics/<slug>/ — see _layouts/topic.html), which is deliberate: those
// pages are fully populated and crawlable, which matters for both visitors
// and AI/search crawlers doing GEO/SEO.

document.addEventListener('DOMContentLoaded', () => {
  // Shrinking header on scroll — pairs with the .is-scrolled rules in
  // style.css. Toggles a class; all the actual sizing/animation lives in
  // CSS, this just tracks scroll position.
  const header = document.querySelector('.site-header');
  if (header) {
    const SCROLL_THRESHOLD = 40; // px scrolled before the header shrinks

    function updateHeaderScrollState() {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
    updateHeaderScrollState(); // handles a page that loads already scrolled down
  }
});
