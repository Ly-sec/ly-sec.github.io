(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateTheme = theme => {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.querySelector('[data-theme-label]').textContent = theme === 'dawn' ? 'Dawn' : 'Dusk';
      themeButton.setAttribute('aria-label', theme === 'dawn' ? 'Switch to Dusk dark theme' : 'Switch to Dawn light theme');
    }
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--background').trim();
    try { localStorage.setItem('lysec-theme', theme); } catch (_) {}
  };
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener('click', () => updateTheme(root.dataset.theme === 'dusk' ? 'dawn' : 'dusk'));
  }
  updateTheme(root.dataset.theme || 'dusk');

  let notificationTimer;
  const notify = message => {
    const notification = document.querySelector('[data-notification]');
    if (!notification) return;
    clearTimeout(notificationTimer);
    notification.textContent = message;
    notification.classList.add('visible');
    notificationTimer = setTimeout(() => notification.classList.remove('visible'), 2400);
  };
  const copyLink = document.querySelector('[data-copy-link]');
  if (copyLink && navigator.clipboard) {
    copyLink.hidden = false;
    copyLink.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href.split('#')[0]); notify('Link copied.'); }
      catch (_) { notify('Copy the address from your browser to share this post.'); }
    });
  }

  const archive = document.querySelector('[data-archive]');
  if (archive) {
    archive.querySelector('[data-archive-tools]').hidden = false;
    archive.querySelector('[data-topic-filters]').hidden = false;
    const search = archive.querySelector('#post-search');
    const rows = [...archive.querySelectorAll('[data-post]')];
    const filters = [...archive.querySelectorAll('[data-filter]')];
    const params = new URLSearchParams(location.search);
    const available = new Set(rows.map(row => row.dataset.topic));
    const requested = params.get('topic');
    let topic = available.has(requested) ? requested : 'all';
    search.value = params.get('q') || '';
    filters.forEach(button => { if (button.dataset.filter !== 'all' && !available.has(button.dataset.filter)) button.hidden = true; });
    const applyFilters = () => {
      const query = search.value.trim().toLowerCase();
      const words = query.split(/\s+/).filter(Boolean);
      let visible = 0;
      rows.forEach(row => {
        const matches = (topic === 'all' || row.dataset.topic === topic) && words.every(word => row.textContent.toLowerCase().includes(word));
        row.hidden = !matches;
        if (matches) visible++;
      });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === topic)));
      archive.querySelectorAll('[data-year]').forEach(year => {
        const count = [...year.querySelectorAll('[data-post]')].filter(row => !row.hidden).length;
        year.hidden = count === 0;
        year.querySelector('h2 span').textContent = `${count} ${count === 1 ? 'post' : 'posts'}`;
      });
      archive.querySelector('[data-result-count]').textContent = `${visible} ${visible === 1 ? 'post' : 'posts'}`;
      archive.querySelector('[data-empty-state]').hidden = visible !== 0;
      const next = new URL(location.href);
      if (query) next.searchParams.set('q', search.value.trim()); else next.searchParams.delete('q');
      if (topic !== 'all') next.searchParams.set('topic', topic); else next.searchParams.delete('topic');
      history.replaceState(null, '', next);
    };
    search.addEventListener('input', applyFilters);
    filters.forEach(button => button.addEventListener('click', () => { topic = button.dataset.filter; applyFilters(); }));
    archive.querySelector('[data-reset-filters]').addEventListener('click', () => { search.value = ''; topic = 'all'; applyFilters(); search.focus(); });
    document.addEventListener('keydown', event => {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); search.focus(); }
      if (event.key === 'Escape' && document.activeElement === search) { search.value = ''; applyFilters(); search.blur(); }
    });
    applyFilters();
  }

  const body = document.querySelector('[data-article-body]');
  if (!body) return;
  body.querySelectorAll('div.highlight').forEach(block => {
    const code = block.querySelector('pre code');
    if (!code || !navigator.clipboard) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'code-copy'; button.textContent = 'Copy'; button.setAttribute('aria-label', 'Copy code block');
    block.append(button);
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(code.textContent); button.textContent = 'Copied'; setTimeout(() => button.textContent = 'Copy', 1800); }
      catch (_) { const range = document.createRange(); range.selectNodeContents(code); const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range); notify('Code selected. Use your copy shortcut.'); }
    });
  });
  const headings = [...body.querySelectorAll('h2, h3')];
  const toc = document.querySelector('[data-toc]');
  if (toc && headings.length >= 3) {
    const usedIds = new Set([...document.querySelectorAll('[id]')].map(element => element.id));
    headings.forEach((heading, index) => {
      if (!heading.id) {
        let id = `section-${index + 1}`;
        while (usedIds.has(id)) id += '-section';
        heading.id = id; usedIds.add(id);
      }
      const link = document.createElement('a'); link.href = '#' + encodeURIComponent(heading.id); link.textContent = heading.textContent;
      if (heading.tagName === 'H3') link.className = 'toc-subheading';
      toc.querySelector('[data-toc-links]').append(link);
    });
    toc.hidden = false;
  }
  const progress = document.querySelector('[data-reading-progress]');
  const tocLinks = toc ? [...toc.querySelectorAll('a[href^="#"]')].filter(link => !link.classList.contains('toc-top')) : [];
  let scheduled = false;
  const updateReading = () => {
    const top = body.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(1, body.offsetHeight - window.innerHeight * .5);
    const amount = Math.min(1, Math.max(0, (window.scrollY + window.innerHeight * .25 - top) / distance));
    if (progress) progress.style.transform = `scaleX(${amount})`;
    let current = headings[0];
    for (const heading of headings) if (heading.getBoundingClientRect().top < 160) current = heading;
    tocLinks.forEach(link => { if (current && decodeURIComponent(link.hash.slice(1)) === current.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    scheduled = false;
  };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateReading); } }, { passive: true });
  window.addEventListener('resize', updateReading);
  updateReading();
})();
