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

  // Mobile menu — on phones and tablets (900px and narrower) the nav links
  // sit in a panel under the header bar, opened by the hamburger button.
  // This only flips the .menu-open class and the button's aria-expanded;
  // the look of it all is in style.css ("mobile menu"). It closes on a tap
  // anywhere else, on Escape, when keyboard focus leaves it, when the window
  // grows back to desktop width, and when the page is restored from the
  // browser's back/forward cache.
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (header && navToggle && navLinks) {
    const isMenuOpen = () => header.classList.contains('menu-open');

    // A short screen (a phone held sideways) may not have room for the whole panel under the
    // header, so while it is open its height is capped to the space that is really left, and the
    // panel scrolls inside itself. Re-measured as the page scrolls, because the header shrinks
    // and moves to the top of the screen.
    function sizeMenu() {
      if (!isMenuOpen()) { navLinks.style.maxHeight = ''; return; }
      const room = window.innerHeight - header.getBoundingClientRect().bottom - 8;
      navLinks.style.maxHeight = Math.max(room, 120) + 'px';
    }

    function setMenu(open) {
      header.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      sizeMenu();
    }

    navToggle.addEventListener('click', () => setMenu(!isMenuOpen()));

    document.addEventListener('click', (e) => {
      if (isMenuOpen() && !navLinks.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        navToggle.focus();
      }
    });

    header.addEventListener('focusout', (e) => {
      const next = e.relatedTarget;
      if (isMenuOpen() && next && !navLinks.contains(next) && next !== navToggle) setMenu(false);
    });

    window.addEventListener('pageshow', () => setMenu(false));

    let menuTicking = false;
    function onMenuViewChange() {
      if (!isMenuOpen() || menuTicking) return;
      menuTicking = true;
      window.requestAnimationFrame(() => { menuTicking = false; sizeMenu(); });
    }
    window.addEventListener('scroll', onMenuViewChange, { passive: true });
    window.addEventListener('resize', onMenuViewChange);

    if (window.matchMedia) {
      const desktop = window.matchMedia('(min-width: 901px)');
      const onChange = (e) => { if (e.matches) setMenu(false); };
      if (desktop.addEventListener) desktop.addEventListener('change', onChange);
      else if (desktop.addListener) desktop.addListener(onChange);
    }
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
      if (header) header.classList.add('search-open');   // lets the phone layout give the bar over to the search box
      searchToggle.setAttribute('aria-expanded', 'true');
      loadIndex();
      window.setTimeout(() => searchInput.focus(), 50);
    }

    function closeSearch() {
      searchWrap.classList.remove('is-open');
      if (header) header.classList.remove('search-open');
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

  // Topic filter bar — arrow buttons that page the pills left and right.
  // The arrows only appear when there are pills hidden in that direction.
  // The row scrolls natively too (swipe, trackpad), so without JS nothing is lost.
  const tScroller = document.getElementById('topic-scroller');
  const tTrack = document.getElementById('topic-track');
  const tPrev = document.getElementById('topic-prev');
  const tNext = document.getElementById('topic-next');
  if (tScroller && tTrack && tPrev && tNext) {
    const updateArrows = () => {
      const max = tTrack.scrollWidth - tTrack.clientWidth;
      const hasPrev = tTrack.scrollLeft > 4;
      const hasNext = tTrack.scrollLeft < max - 4;
      tPrev.hidden = !hasPrev;
      tNext.hidden = !hasNext;
      tScroller.classList.toggle('has-prev', hasPrev);
      tScroller.classList.toggle('has-next', hasNext);
    };
    const page = (dir) => tTrack.scrollBy({ left: dir * tTrack.clientWidth * 0.75, behavior: 'smooth' });
    tPrev.addEventListener('click', () => page(-1));
    tNext.addEventListener('click', () => page(1));
    tTrack.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    // Start with the current topic's pill in view (matters for topics far along the row).
    const activePill = tTrack.querySelector('.topic-pill.active');
    if (activePill) {
      const target = activePill.offsetLeft - (tTrack.clientWidth - activePill.offsetWidth) / 2;
      tTrack.scrollLeft = Math.max(0, target);
    }
    updateArrows();
  }

  // Faculty profile tabs (Featured research / Research / Editorial service /
  // In the media). Every panel is real markup in the page; this just shows one
  // at a time. Without JS the panels all show, stacked, and the tab bar stays
  // hidden. Works as a standard tab widget: click, Left/Right/Home/End keys,
  // and a #research / #in-the-media style link opens that tab directly.
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const list = root.querySelector('[role="tablist"]');
    const tabs = list ? Array.from(list.querySelectorAll('[role="tab"]')) : [];
    if (tabs.length < 2) return;
    const bar = list.parentElement;
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
    if (panels.some((p) => !p)) return;

    const updateFades = () => {
      const max = list.scrollWidth - list.clientWidth;
      bar.classList.toggle('has-prev', list.scrollLeft > 4);
      bar.classList.toggle('has-next', list.scrollLeft < max - 4);
    };

    const select = (tab, opts) => {
      const o = opts || {};
      tabs.forEach((t, i) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      // keep the chosen tab in view on a narrow screen
      const left = tab.offsetLeft - 24;
      const right = tab.offsetLeft + tab.offsetWidth + 24;
      if (left < list.scrollLeft) list.scrollLeft = Math.max(0, left);
      else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
      updateFades();
      if (o.focus) tab.focus();
      if (o.hash) {
        try { window.history.replaceState(null, '', window.location.pathname + window.location.search + '#' + tab.dataset.tab); } catch (e) { /* ignore */ }
      }
    };

    const fromHash = () => {
      const id = window.location.hash.replace('#', '');
      return tabs.find((t) => t.dataset.tab === id) || null;
    };

    tabs.forEach((tab) => tab.addEventListener('click', () => select(tab, { hash: true })));

    list.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, { focus: true, hash: true }); }
    });

    list.addEventListener('scroll', updateFades, { passive: true });
    window.addEventListener('resize', updateFades);

    // Bring the tab bar into view (jumping, not gliding, like any link to an anchor).
    const showTabs = () => {
      try { root.scrollIntoView({ behavior: 'instant', block: 'start' }); }
      catch (e) { root.scrollIntoView(); }
    };
    window.addEventListener('hashchange', () => { const t = fromHash(); if (t) { select(t); showTabs(); } });

    // A shared link ending #in-the-media opens that tab and lands on the tab bar. The panels'
    // ids deliberately don't match the hash, so the browser never scrolls on its own and
    // this is the only scroll; it runs again once images have loaded, since they can push
    // the tabs down, unless the reader has already started scrolling.
    const initial = fromHash();
    select(initial || tabs[0]);
    if (initial) {
      let moved = false;
      ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((ev) => window.addEventListener(ev, () => { moved = true; }, { once: true, passive: true }));
      window.requestAnimationFrame(showTabs);
      window.addEventListener('load', () => { if (!moved) showTabs(); });
    }
  });

  // Story pages — the Share buttons (LinkedIn, Email). The links in the page already work; this
  // rebuilds them from the address the page is being viewed at, so they are right whichever
  // address serves the site (the project's github.io address now, the school's own domain later)
  // and whatever the site's url setting says.
  const shareLinks = document.querySelectorAll('a[data-share]');
  if (shareLinks.length) {
    const shareUrl = window.location.origin + window.location.pathname;
    const h1 = document.querySelector('.article-header h1');
    const shareTitle = ((h1 && h1.textContent) || document.title || '').replace(/\s+/g, ' ').trim();
    shareLinks.forEach((a) => {
      if (a.dataset.share === 'linkedin') {
        a.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareUrl);
      } else if (a.dataset.share === 'email') {
        a.href = 'mailto:?subject=' + encodeURIComponent(shareTitle)
          + '&body=' + encodeURIComponent(shareTitle + '\n\n' + shareUrl);
      }
    });
  }

  // Faculty directory — filter the cards by academic area and research topic, and search by
  // name. Every card carries data-name / data-area / data-topics set at build time (see
  // faculty-directory.html and faculty-card.html), so this only hides and shows what is already
  // on the page: the full A-Z list is there without JavaScript. The chosen view is mirrored
  // into the address (?area=finance&topic=accounting&q=smith) so it can be bookmarked or shared.
  const fdControls = document.getElementById('fd-controls');
  const fdGrid = document.getElementById('fd-grid');
  if (fdControls && fdGrid) {
    const fdItems = Array.from(fdGrid.querySelectorAll('.fd-item'));
    const fdQ = document.getElementById('fd-q');
    const fdArea = document.getElementById('fd-area');
    const fdTopic = document.getElementById('fd-topic');
    const fdClear = document.getElementById('fd-clear');
    const fdStatus = document.getElementById('fd-status');
    const fdEmpty = document.getElementById('fd-empty');
    const fdEmptyClear = document.getElementById('fd-empty-clear');
    const fdTotal = fdItems.length;

    // Lower-case and strip accents so "jose" finds "José".
    const fdNorm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
    const fdHas = (sel, value) => Array.from(sel.options).some((o) => o.value === value);
    fdItems.forEach((li) => { li._fdName = fdNorm(li.dataset.name); });

    // Pick up a shared/bookmarked view from the address.
    const fdParams = new URLSearchParams(window.location.search);
    if (fdHas(fdArea, fdParams.get('area'))) fdArea.value = fdParams.get('area');
    if (fdHas(fdTopic, fdParams.get('topic'))) fdTopic.value = fdParams.get('topic');
    if (fdParams.get('q')) fdQ.value = fdParams.get('q').slice(0, 80);

    function fdSyncUrl() {
      const p = new URLSearchParams();
      if (fdArea.value) p.set('area', fdArea.value);
      if (fdTopic.value) p.set('topic', fdTopic.value);
      if (fdQ.value.trim()) p.set('q', fdQ.value.trim());
      const qs = p.toString();
      try { window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash); }
      catch (e) { /* a sandboxed preview may refuse; the filters still work */ }
    }

    function fdRender() {
      const q = fdNorm(fdQ.value);
      const area = fdArea.value;
      const topic = fdTopic.value;
      let shown = 0;
      fdItems.forEach((li) => {
        const topics = (li.dataset.topics || '').split(' ');
        const ok = (!area || li.dataset.area === area)
          && (!topic || topics.indexOf(topic) !== -1)
          && (!q || li._fdName.indexOf(q) !== -1);
        li.hidden = !ok;
        if (ok) shown += 1;
      });
      const filtered = !!(area || topic || q);
      fdStatus.textContent = filtered
        ? 'Showing ' + shown + ' of ' + fdTotal + ' faculty, listed A–Z by last name'
        : fdTotal + ' faculty, listed A–Z by last name';
      fdClear.hidden = !filtered;
      fdEmpty.hidden = shown > 0;
      fdSyncUrl();
    }

    const fdReset = () => { fdQ.value = ''; fdArea.value = ''; fdTopic.value = ''; fdRender(); };
    fdQ.addEventListener('input', fdRender);
    fdArea.addEventListener('change', fdRender);
    fdTopic.addEventListener('change', fdRender);
    fdClear.addEventListener('click', fdReset);
    fdEmptyClear.addEventListener('click', fdReset);
    fdControls.addEventListener('submit', (e) => e.preventDefault());   // Enter in the search box must not reload the page

    fdControls.hidden = false;
    fdRender();
  }

  // Topic pages — "View more research" reveals the rest of the article list.
  // The extra rows are real, crawlable markup that's always in the page;
  // topic.html tags <html class="js"> before they paint and CSS keeps them
  // collapsed until this opens them (and hides the button when there's no
  // script, so nothing is ever stranded behind it).
  const moreBtn = document.getElementById('topic-more-btn');
  const moreRows = document.getElementById('topic-more-rows');
  if (moreBtn && moreRows) {
    moreBtn.addEventListener('click', () => {
      moreRows.classList.add('is-open');
      moreBtn.setAttribute('aria-expanded', 'true');
      const wrap = moreBtn.closest('.more-wrap');
      if (wrap) wrap.classList.add('is-done');
      // Keep keyboard/screen-reader users oriented: land on the first new row.
      const firstNew = moreRows.querySelector('.article-row-text a');
      if (firstNew) firstNew.focus({ preventScroll: true });
    });
  }
});
