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

  // Journals page — sort (A–Z / Premier first) and filter (Premier, KU
  // Research, Editorial service). Every entry carries data-premier /
  // data-research / data-service flags set at build time (see
  // journals.html), so this only reorders and hides what's already on the
  // page: no fetch, no index. Filters combine with AND — turning on Premier
  // and Editorial service shows premier journals where KU faculty also
  // serve. The chosen view is mirrored into the URL (?sort=premier&show=
  // premier,service) so a particular view can be bookmarked or shared.
  const jControls = document.getElementById('journal-controls');
  const jList = document.getElementById('journal-list');
  const jJump = document.getElementById('journal-jumplist');
  if (jControls && jList && jJump) {
    const FILTERS = ['premier', 'research', 'service'];
    const entries = Array.from(jList.querySelectorAll('.journal-entry'));
    const jumpBySlug = new Map(
      Array.from(jJump.querySelectorAll('.jl-item')).map((el) => [el.dataset.slug, el])
    );
    const sortButtons = Array.from(jControls.querySelectorAll('[data-sort]'));
    const chips = Array.from(jControls.querySelectorAll('[data-filter]'));
    const clearBtn = document.getElementById('journal-clear');
    const emptyMsg = document.getElementById('journal-empty');
    const emptyClear = document.getElementById('journal-empty-clear');
    const status = document.getElementById('journal-status');

    const state = { sort: 'az', filters: new Set() };

    // Pick up a shared/bookmarked view from the URL.
    const params = new URLSearchParams(window.location.search);
    if (params.get('sort') === 'premier') state.sort = 'premier';
    (params.get('show') || '').split(',').forEach((f) => {
      if (FILTERS.includes(f)) state.filters.add(f);
    });

    const isOn = (el, key) => el.dataset[key] === '1';

    function syncUrl() {
      const p = new URLSearchParams();
      if (state.sort === 'premier') p.set('sort', 'premier');
      if (state.filters.size) p.set('show', FILTERS.filter((f) => state.filters.has(f)).join(','));
      const qs = p.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
    }

    function render() {
      // Order: A–Z is the build-time order (data-order); "Premier first"
      // floats premier journals up, keeping A–Z inside each group.
      const ordered = entries.slice().sort((a, b) => {
        if (state.sort === 'premier') {
          const d = Number(isOn(b, 'premier')) - Number(isOn(a, 'premier'));
          if (d) return d;
        }
        return Number(a.dataset.order) - Number(b.dataset.order);
      });

      jList.querySelectorAll('.journal-group-label').forEach((el) => el.remove());

      let visible = 0;
      let firstJump = true;
      let firstPremier = null;
      let firstOther = null;
      let premierCount = 0;
      let otherCount = 0;

      ordered.forEach((el) => {
        const show = Array.from(state.filters).every((f) => isOn(el, f));
        el.hidden = !show;
        jList.appendChild(el);

        const jump = jumpBySlug.get(el.dataset.slug);
        if (jump) {
          jump.hidden = !show;
          jJump.appendChild(jump);
        }

        if (!show) return;
        visible += 1;
        if (isOn(el, 'premier')) {
          premierCount += 1;
          if (!firstPremier) firstPremier = el;
        } else {
          otherCount += 1;
          if (!firstOther) firstOther = el;
        }
      });

      // When sorted "Premier first" and both groups are on screen, label them.
      if (state.sort === 'premier' && firstPremier && firstOther) {
        const label = (text) => {
          const p = document.createElement('p');
          p.className = 'journal-group-label';
          p.textContent = text;
          return p;
        };
        jList.insertBefore(label('Premier journals · ' + premierCount), firstPremier);
        jList.insertBefore(label('All other journals · ' + otherCount), firstOther);
      }

      sortButtons.forEach((btn) => {
        const on = btn.dataset.sort === state.sort;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
      chips.forEach((chip) => {
        chip.setAttribute('aria-pressed', String(state.filters.has(chip.dataset.filter)));
      });

      const total = entries.length;
      const filtered = state.filters.size > 0;
      status.textContent = filtered
        ? 'Showing ' + visible + ' of ' + total + ' journals'
        : total + ' journals';
      clearBtn.hidden = !filtered;
      emptyMsg.hidden = visible !== 0;
      syncUrl();
    }

    jControls.addEventListener('click', (e) => {
      const sortBtn = e.target.closest('[data-sort]');
      const chip = e.target.closest('[data-filter]');
      if (sortBtn) {
        state.sort = sortBtn.dataset.sort;
      } else if (chip) {
        const f = chip.dataset.filter;
        if (state.filters.has(f)) state.filters.delete(f); else state.filters.add(f);
      } else {
        return;
      }
      render();
    });

    const clearFilters = () => { state.filters.clear(); render(); };
    clearBtn.addEventListener('click', clearFilters);
    emptyClear.addEventListener('click', clearFilters);

    jControls.hidden = false;
    render();
  }
});
