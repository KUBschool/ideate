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

  // Header search — expand/collapse the icon into an input, and search a
  // JSON index built at Jekyll build time (/search.json — see that file
  // for how it's generated). Fully client-side: no external service, no
  // server call at search time, works entirely within GitHub Pages.
  const searchWrap = document.getElementById('nav-search');
  const searchToggle = document.getElementById('nav-search-toggle');
  const searchInput = document.getElementById('nav-search-input');
  const searchResults = document.getElementById('nav-search-results');

  if (searchWrap && searchToggle && searchInput && searchResults) {
    let searchIndex = null;
    let indexPromise = null;

    function loadIndex() {
      if (!indexPromise) {
        indexPromise = fetch(searchWrap.dataset.indexUrl)
          .then((res) => res.json())
          .then((data) => { searchIndex = data; return data; })
          .catch(() => { searchIndex = []; return []; });
      }
      return indexPromise;
    }

    function clearResults() {
      searchResults.innerHTML = '';
      searchResults.classList.remove('has-results');
    }

    function renderEmpty() {
      searchResults.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'nav-search-empty';
      p.textContent = 'No results found.';
      searchResults.appendChild(p);
      searchResults.classList.add('has-results');
    }

    function renderResults(items) {
      searchResults.innerHTML = '';
      items.slice(0, 8).forEach((item) => {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'nav-search-result';

        const type = document.createElement('span');
        type.className = 'result-type';
        type.textContent = item.topic;

        const title = document.createElement('div');
        title.className = 'result-title';
        title.textContent = item.title;

        const dek = document.createElement('div');
        dek.className = 'result-dek';
        dek.textContent = item.dek;

        a.appendChild(type);
        a.appendChild(title);
        a.appendChild(dek);
        searchResults.appendChild(a);
      });
      searchResults.classList.add('has-results');
    }

    function runSearch(query) {
      const q = query.trim().toLowerCase();
      if (!q) { clearResults(); return; }
      if (!searchIndex) { return; } // still loading; input event will fire again on next keystroke anyway

      const matches = searchIndex.filter((item) => {
        return (
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.dek && item.dek.toLowerCase().includes(q)) ||
          (item.topic && item.topic.toLowerCase().includes(q)) ||
          (item.byline && item.byline.toLowerCase().includes(q))
        );
      });

      if (matches.length === 0) {
        renderEmpty();
      } else {
        renderResults(matches);
      }
    }

    function openSearch() {
      searchWrap.classList.add('is-open');
      searchToggle.setAttribute('aria-expanded', 'true');
      loadIndex();
      window.setTimeout(() => searchInput.focus(), 50);
    }

    function closeSearch() {
      searchWrap.classList.remove('is-open');
      searchToggle.setAttribute('aria-expanded', 'false');
      searchInput.value = '';
      clearResults();
    }

    searchToggle.addEventListener('click', () => {
      if (searchWrap.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    searchInput.addEventListener('input', (e) => runSearch(e.target.value));

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    document.addEventListener('click', (e) => {
      if (searchWrap.classList.contains('is-open') && !searchWrap.contains(e.target)) {
        closeSearch();
      }
    });
  }
});
