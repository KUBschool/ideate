// Ideate — site JS
//
// The topic pills are plain links to each topic's real archive page
// (/topics/<slug>/ — see _layouts/topic.html), which is deliberate: those
// pages are fully populated and crawlable, which matters for both visitors
// and AI/search crawlers doing GEO/SEO.

document.addEventListener('DOMContentLoaded', () => {
  // Shrinking/darkening header on scroll — pairs with the .is-scrolled
  // rules in style.css. Toggles a class; all the actual sizing/color
  // animation lives in CSS, this just tracks scroll position.
  //
  // Batched with requestAnimationFrame and only touches the DOM when the
  // scrolled/not-scrolled state actually flips. A raw `scroll` listener
  // can fire dozens of times per second during a fast trackpad swipe —
  // recalculating and re-applying styles on every single one of those
  // events is what causes a stall-then-jump stutter, since the browser's
  // main thread can't keep up with both the scroll input and the layout
  // work at once. This keeps that work to at most once per rendered
  // frame, and only when there's actually something new to apply.
  const header = document.querySelector('.site-header');
  if (header) {
    const SCROLL_THRESHOLD = 40; // px scrolled before the header shrinks
    let isScrolled = false;
    let ticking = false;

    function applyScrollState() {
      const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle('is-scrolled', isScrolled);
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(applyScrollState);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    applyScrollState(); // handles a page that loads already scrolled down
  }
});
