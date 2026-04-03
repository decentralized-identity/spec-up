import mermaid from 'mermaid';

(function() {
  const page = document.querySelector('wa-page');
  const ISSUE_PAGE_SIZE = 20;
  const THEME_STORAGE_KEY = 'spec-up-color-scheme';
  const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';
  const THEME_AUTO_PREFERENCE = 'auto';
  const THEME_CHANGE_EVENT = 'spec-up-themechange';
  const MERMAID_QUERY_SELECTOR = '.mermaid';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setIssueStatus(message) {
    const statusNode = document.getElementById('repo_issue_status');

    if (statusNode) {
      statusNode.textContent = message;
    }
  }

  function formatIssueDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function createIssuePreview(body) {
    const text = String(body || '').replace(/\s+/g, ' ').trim();

    if (!text) {
      return '';
    }

    if (text.length <= 180) {
      return text;
    }

    return `${text.slice(0, 177)}...`;
  }

  function isThemePreference(value) {
    return value === 'light' || value === 'dark' || value === THEME_AUTO_PREFERENCE;
  }

  function getStoredThemePreference() {
    try {
      const storedThemePreference = window.localStorage.getItem(THEME_STORAGE_KEY);

      return isThemePreference(storedThemePreference) ? storedThemePreference : null;
    }
    catch {
      return null;
    }
  }

  function setStoredThemePreference(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    catch {
      // Ignore storage failures and keep the in-memory theme active.
    }
  }

  function getSystemThemePreference() {
    if (window.matchMedia && window.matchMedia(THEME_MEDIA_QUERY).matches) {
      return 'dark';
    }

    return 'light';
  }

  function resolveThemePreference(themePreference) {
    if (themePreference === THEME_AUTO_PREFERENCE) {
      return getSystemThemePreference();
    }

    return themePreference === 'dark' ? 'dark' : 'light';
  }

  function applyThemePreference(themePreference) {
    const root = document.documentElement;
    const previousTheme = root.dataset.theme || '';
    const previousPreference = root.dataset.themePreference || '';
    const normalizedPreference = isThemePreference(themePreference) ? themePreference : THEME_AUTO_PREFERENCE;
    const normalizedTheme = resolveThemePreference(normalizedPreference);

    root.classList.toggle('wa-dark', normalizedTheme === 'dark');
    root.classList.toggle('wa-light', normalizedTheme === 'light');
    root.dataset.theme = normalizedTheme;
    root.dataset.themePreference = normalizedPreference;
    root.style.colorScheme = normalizedTheme;

    if (previousTheme !== normalizedTheme || previousPreference !== normalizedPreference) {
      window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, {
        detail: {
          preference: normalizedPreference,
          theme: normalizedTheme
        }
      }));
    }

    return {
      preference: normalizedPreference,
      theme: normalizedTheme
    };
  }

  function formatThemeLabel(themePreference, theme) {
    if (themePreference === THEME_AUTO_PREFERENCE) {
      return `System (${theme === 'dark' ? 'Dark' : 'Light'})`;
    }

    return themePreference === 'dark' ? 'Dark' : 'Light';
  }

  function syncThemeSelector(themeState) {
    const themeSelector = document.getElementById('spec_up_theme_selector');
    const themeTrigger = document.getElementById('color-scheme-selector-trigger');

    if (!themeSelector || !themeTrigger) {
      return;
    }

    const themeLabel = formatThemeLabel(themeState.preference, themeState.theme);

    themeSelector.dataset.themePreference = themeState.preference;
    themeSelector.querySelectorAll('wa-dropdown-item[value]').forEach(item => {
      const isCurrent = item.value === themeState.preference;

      item.toggleAttribute('data-current', isCurrent);

      if (isCurrent) {
        item.setAttribute('aria-current', 'true');
      }
      else {
        item.removeAttribute('aria-current');
      }
    });

    themeTrigger.setAttribute('aria-label', `Color theme: ${themeLabel}`);
    themeTrigger.setAttribute('title', `Color theme: ${themeLabel}`);
  }

  function createThemeController() {
    const themeSelector = document.getElementById('spec_up_theme_selector');
    const mediaQuery = window.matchMedia ? window.matchMedia(THEME_MEDIA_QUERY) : null;
    let themeState = applyThemePreference(
      getStoredThemePreference() ||
      document.documentElement.dataset.themePreference ||
      THEME_AUTO_PREFERENCE
    );

    syncThemeSelector(themeState);

    if (!themeSelector) {
      return null;
    }

    themeSelector.addEventListener('wa-select', event => {
      const nextThemePreference = event.detail && event.detail.item ? event.detail.item.value : null;

      if (!isThemePreference(nextThemePreference)) {
        return;
      }

      themeState = applyThemePreference(nextThemePreference);
      setStoredThemePreference(themeState.preference);
      syncThemeSelector(themeState);
    });

    if (mediaQuery) {
      const handleSystemThemeChange = () => {
        const storedThemePreference = getStoredThemePreference();

        if (storedThemePreference && storedThemePreference !== THEME_AUTO_PREFERENCE) {
          return;
        }

        if ((storedThemePreference || themeState.preference) !== THEME_AUTO_PREFERENCE) {
          return;
        }

        themeState = applyThemePreference(THEME_AUTO_PREFERENCE);
        syncThemeSelector(themeState);
      };

      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      }
      else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }

    return {
      getTheme() {
        return themeState.theme;
      },
      getThemePreference() {
        return themeState.preference;
      }
    };
  }

  function getMermaidTheme(theme) {
    return theme === 'dark' ? 'dark' : 'neutral';
  }

  function createMermaidController(themeController) {
    const diagramSources = new WeakMap();
    let renderQueue = Promise.resolve();

    function getCurrentTheme() {
      if (themeController && typeof themeController.getTheme === 'function') {
        return themeController.getTheme();
      }

      return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    }

    function getMermaidNodes() {
      return Array.from(document.querySelectorAll(MERMAID_QUERY_SELECTOR));
    }

    function captureDiagramSources(nodes) {
      nodes.forEach(node => {
        if (!diagramSources.has(node)) {
          diagramSources.set(node, node.innerHTML);
        }
      });
    }

    function restoreDiagramSources(nodes) {
      nodes.forEach(node => {
        const source = diagramSources.get(node);

        if (typeof source !== 'string') {
          return;
        }

        node.innerHTML = source;
        node.removeAttribute('data-processed');
      });
    }

    async function renderDiagrams(theme) {
      const nodes = getMermaidNodes();

      if (!nodes.length) {
        mermaid.initialize({
          startOnLoad: false,
          theme: getMermaidTheme(theme)
        });
        return;
      }

      captureDiagramSources(nodes);
      restoreDiagramSources(nodes);

      mermaid.initialize({
        startOnLoad: false,
        theme: getMermaidTheme(theme)
      });

      await mermaid.run({ nodes });
    }

    function queueRender(theme) {
      const normalizedTheme = theme === 'dark' ? 'dark' : 'light';

      renderQueue = renderQueue
        .catch(() => {})
        .then(() => renderDiagrams(normalizedTheme))
        .catch(error => {
          console.warn('Mermaid diagrams could not be rendered.', error);
        });

      return renderQueue;
    }

    window.addEventListener(THEME_CHANGE_EVENT, event => {
      const nextTheme = event && event.detail && event.detail.theme
        ? event.detail.theme
        : getCurrentTheme();

      queueRender(nextTheme);
    });

    queueRender(getCurrentTheme());

    return {
      rerender() {
        return queueRender(getCurrentTheme());
      }
    };
  }

  function renderIssues(issues) {
    const list = document.getElementById('repo_issue_list');

    if (!list) {
      return;
    }

    if (!issues.length) {
      list.innerHTML = '';
      return;
    }

    list.innerHTML = issues.map(issue => {
      const preview = createIssuePreview(issue.body);

      return `
        <li class="repo-issue">
          <a class="repo-issue-link" href="${escapeHtml(issue.html_url)}" target="_blank" rel="noreferrer">
            <span class="repo-issue-number">#${escapeHtml(issue.number)}</span>
            <span class="repo-issue-title">${escapeHtml(issue.title)}</span>
          </a>
          <div class="repo-issue-meta">Updated ${escapeHtml(formatIssueDate(issue.updated_at))} by ${escapeHtml(issue.user && issue.user.login ? issue.user.login : 'unknown')}</div>
          ${preview ? `<p class="repo-issue-preview">${escapeHtml(preview)}</p>` : ''}
        </li>
      `;
    }).join('');
  }

  function createGithubIssueBrowser(source) {
    const { account, repo } = source;
    const drawer = document.getElementById('repo_issues_drawer');
    const panel = document.getElementById('repo_issue_panel');
    const list = document.getElementById('repo_issue_list');
    const searchInput = document.getElementById('repo_issue_search');
    const searchClearButton = document.getElementById('repo_issue_search_clear');
    const searchSpinner = document.getElementById('repo_issue_search_spinner');
    const loadMoreIndicator = document.getElementById('repo_issue_load_more');
    const repositoryPath = `${account}/${repo}`;
    const state = {
      base: {
        hasMore: true,
        items: [],
        loaded: false,
        loading: false,
        page: 0,
        totalCount: null
      },
      mode: 'base',
      requestController: null,
      requestMode: null,
      requestPage: 0,
      requestQuery: '',
      requestToken: 0,
      search: {
        hasMore: false,
        items: [],
        loaded: false,
        loading: false,
        page: 0,
        query: '',
        totalCount: 0
      },
      searchDebounce: null
    };

    if (!panel || !list || !searchInput) {
      return null;
    }

    async function moveDrawerCloseButtonIntoTitle() {
      if (!drawer) {
        return;
      }

      try {
        if (drawer.updateComplete && typeof drawer.updateComplete.then === 'function') {
          await drawer.updateComplete;
        }
      }
      catch {
        // Ignore component update timing issues and use best-effort DOM access below.
      }

      const shadowRoot = drawer.shadowRoot;
      const closeButton = shadowRoot && shadowRoot.querySelector('[part="close-button"]');
      const titleActions = drawer.querySelector('.spec-up-drawer-title-actions');

      if (titleActions && closeButton && closeButton.parentElement !== titleActions) {
        titleActions.append(closeButton);
      }
    }

    function getVisibleCollection() {
      return state.mode === 'search' ? state.search : state.base;
    }

    function setPanelUpdating(isUpdating) {
      panel.classList.toggle('is-updating', isUpdating);
      panel.setAttribute('aria-busy', isUpdating ? 'true' : 'false');
    }

    function setSearchLoading(isLoading) {
      if (searchSpinner) {
        searchSpinner.hidden = !isLoading;
      }
    }

    function setLoadMoreLoading(isLoading) {
      if (loadMoreIndicator) {
        loadMoreIndicator.hidden = !isLoading;
      }
    }

    function syncSearchControls() {
      if (!searchClearButton) {
        return;
      }

      const hasQuery = Boolean(String(searchInput.value || '').trim());
      searchClearButton.disabled = !hasQuery && state.mode !== 'search';
    }

    function syncLoadingIndicators() {
      const visibleCollection = getVisibleCollection();
      const isSearchLoading = (
        state.requestMode === 'search' &&
        state.requestPage === 1 &&
        state.search.loading &&
        Boolean(String(state.requestQuery || '').trim())
      );
      const isLoadMoreVisible = (
        state.requestPage > 1 &&
        state.requestMode === state.mode &&
        visibleCollection.loading &&
        visibleCollection.hasMore
      );

      setSearchLoading(isSearchLoading);
      setLoadMoreLoading(isLoadMoreVisible);
    }

    function buildBaseStatus() {
      if (!state.base.loaded) {
        return 'Loading open GitHub issues…';
      }

      if (!state.base.items.length) {
        return 'No open issues found.';
      }

      return state.base.hasMore
        ? `Showing ${state.base.items.length} open issues. Scroll for more.`
        : `Showing ${state.base.items.length} open issue${state.base.items.length === 1 ? '' : 's'}.`;
    }

    function buildSearchStatus() {
      const query = state.search.query;

      if (!state.search.loaded) {
        return `Searching open issues for "${query}"…`;
      }

      if (!state.search.items.length) {
        return `No open issues found for "${query}".`;
      }

      if (state.search.totalCount > state.search.items.length) {
        return `Showing ${state.search.items.length} of ${state.search.totalCount} results for "${query}". Scroll for more.`;
      }

      return `Showing ${state.search.items.length} result${state.search.items.length === 1 ? '' : 's'} for "${query}".`;
    }

    function renderVisibleIssues() {
      renderIssues(getVisibleCollection().items);
      setIssueStatus(state.mode === 'search' ? buildSearchStatus() : buildBaseStatus());
      syncSearchControls();
    }

    function abortActiveRequest() {
      if (state.requestController) {
        state.requestController.abort();
        state.requestController = null;
      }
    }

    function scheduleLoadMoreCheck() {
      window.requestAnimationFrame(() => {
        maybeLoadMore();
      });
    }

    async function fetchIssuePage(mode, pageNumber, query) {
      const isSearch = mode === 'search';
      const collection = isSearch ? state.search : state.base;
      const token = state.requestToken + 1;
      const endpoint = isSearch
        ? `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repositoryPath} is:issue is:open ${query}`)}&sort=updated&order=desc&per_page=${ISSUE_PAGE_SIZE}&page=${pageNumber}`
        : `https://api.github.com/repos/${repositoryPath}/issues?state=open&sort=updated&direction=desc&per_page=${ISSUE_PAGE_SIZE}&page=${pageNumber}`;

      abortActiveRequest();
      state.requestToken = token;
      state.requestController = new AbortController();
      state.requestMode = mode;
      state.requestPage = pageNumber;
      state.requestQuery = isSearch ? query : '';
      collection.loading = true;
      syncLoadingIndicators();

      if (pageNumber === 1) {
        if (isSearch) {
          setIssueStatus(`Searching open issues for "${query}"…`);
        }
        else {
          setIssueStatus('Loading open GitHub issues…');
        }

        setPanelUpdating(true);
      }
      else {
        syncSearchControls();
      }

      try {
        const response = await fetch(endpoint, {
          headers: {
            Accept: 'application/vnd.github+json'
          },
          signal: state.requestController.signal
        });

        if (!response.ok) {
          throw new Error(`GitHub issues request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const linkHeader = response.headers.get('link') || '';
        const hasNextPage = /<[^>]+>;\s*rel="next"/.test(linkHeader);

        if (token !== state.requestToken) {
          return;
        }

        const baseItems = Array.isArray(payload) ? payload : [];
        const items = isSearch
          ? (Array.isArray(payload.items) ? payload.items : [])
          : baseItems.filter(item => !item.pull_request);
        const totalCount = isSearch
          ? (typeof payload.total_count === 'number' ? payload.total_count : items.length)
          : null;

        collection.page = pageNumber;
        collection.loaded = true;
        collection.items = pageNumber === 1 ? items : collection.items.concat(items);
        collection.totalCount = totalCount;
        collection.hasMore = isSearch
          ? collection.items.length < totalCount
          : (linkHeader ? hasNextPage : baseItems.length === ISSUE_PAGE_SIZE);

        if (isSearch) {
          state.mode = 'search';
          state.search.query = query;
        }
        else {
          state.mode = 'base';
        }

        renderVisibleIssues();
        scheduleLoadMoreCheck();
      }
      catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        if (token !== state.requestToken) {
          return;
        }

        setIssueStatus(isSearch
          ? `GitHub issue search could not be completed for "${query}" right now.`
          : 'GitHub issues could not be loaded right now.');
        console.warn(error);
      }
      finally {
        if (token === state.requestToken) {
          collection.loading = false;
          state.requestController = null;
          state.requestMode = null;
          state.requestPage = 0;
          state.requestQuery = '';
          setPanelUpdating(false);
          syncLoadingIndicators();
          syncSearchControls();
        }
      }
    }

    function loadBaseIssues(pageNumber = 1) {
      return fetchIssuePage('base', pageNumber, '');
    }

    function loadSearchIssues(query, pageNumber = 1) {
      return fetchIssuePage('search', pageNumber, query);
    }

    function restoreBaseIssues() {
      if (state.requestMode === 'search') {
        abortActiveRequest();
      }

      state.requestMode = null;
      state.requestPage = 0;
      state.requestQuery = '';
      state.search.loading = false;
      setPanelUpdating(false);
      state.mode = 'base';
      syncLoadingIndicators();
      syncSearchControls();

      if (state.base.loaded) {
        renderVisibleIssues();
      }
      else {
        loadBaseIssues();
      }
    }

    function handleSearchChange() {
      const query = String(searchInput.value || '').trim();

      window.clearTimeout(state.searchDebounce);
      state.searchDebounce = null;
      syncSearchControls();

      if (!query) {
        restoreBaseIssues();
        return;
      }

      if (query === state.search.query && state.search.loaded) {
        state.mode = 'search';
        renderVisibleIssues();
        return;
      }

      state.searchDebounce = window.setTimeout(() => {
        state.search.items = [];
        state.search.loaded = false;
        state.search.page = 0;
        state.search.hasMore = false;
        state.search.totalCount = 0;
        loadSearchIssues(query);
      }, 280);
    }

    function clearSearch() {
      window.clearTimeout(state.searchDebounce);
      state.searchDebounce = null;
      searchInput.value = '';
      restoreBaseIssues();

      if (typeof searchInput.focus === 'function') {
        searchInput.focus();
      }
    }

    function maybeLoadMore() {
      const collection = getVisibleCollection();

      if (!collection.loaded || collection.loading || !collection.hasMore) {
        return;
      }

      const distanceFromBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight;

      if (distanceFromBottom > 240) {
        return;
      }

      if (state.mode === 'search') {
        loadSearchIssues(state.search.query, state.search.page + 1);
      }
      else {
        loadBaseIssues(state.base.page + 1);
      }
    }

    searchInput.addEventListener('input', handleSearchChange);
    if (searchClearButton) {
      searchClearButton.addEventListener('click', clearSearch);
    }
    panel.addEventListener('scroll', maybeLoadMore, { passive: true });
    syncLoadingIndicators();
    syncSearchControls();
    moveDrawerCloseButtonIntoTitle();

    if (drawer) {
      drawer.addEventListener('wa-after-show', () => {
        moveDrawerCloseButtonIntoTitle();
        if (typeof searchInput.focus === 'function') {
          searchInput.focus();
        }
        scheduleLoadMoreCheck();
      });
    }

    return {
      loadBaseIssues
    };
  }

  function closeNavigation() {
    if (page && typeof page.hideNavigation === 'function') {
      page.hideNavigation();
    }
  }

  function createTocController() {
    const tocLinks = Array.from(document.querySelectorAll('#toc a[href^="#"]'));
    const content = document.getElementById('content');
    const sections = tocLinks.map(link => {
      const href = link.getAttribute('href') || '';

      if (!href.startsWith('#') || href.length === 1) {
        return null;
      }

      return {
        heading: document.getElementById(href.slice(1)),
        href
      };
    }).filter(section => section && section.heading);

    if (!sections.length) {
      return null;
    }

    const sectionHashes = new Set(sections.map(section => section.href));
    let hashLock = null;
    let activeHref = '';
    let syncFrame = 0;

    function setActiveLink(href) {
      if (activeHref === href) {
        return;
      }

      activeHref = href;
      tocLinks.forEach(link => {
        if (href && link.getAttribute('href') === href) {
          link.setAttribute('aria-current', 'location');
        }
        else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function getScrollOffset() {
      const header = document.getElementById('app_header');

      if (header) {
        return header.getBoundingClientRect().height + 16;
      }

      const headerHeight = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      );

      return (Number.isFinite(headerHeight) ? headerHeight : 0) + 16;
    }

    function getHashUnlockDistance() {
      return Math.max(160, getScrollOffset() * 1.5);
    }

    function getElementFromHash(hash) {
      if (!hash || hash === '#') {
        return null;
      }

      const rawId = hash.slice(1);
      let decodedId = rawId;

      try {
        decodedId = decodeURIComponent(rawId);
      }
      catch {}

      return document.getElementById(decodedId) || document.getElementById(rawId);
    }

    function deferAfterNavigation(fn) {
      if (typeof globalThis.skipAnimationFrame === 'function') {
        globalThis.skipAnimationFrame(fn);
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(fn);
      });
    }

    function queueHashLock(hash) {
      const normalizedHash = typeof hash === 'string' ? hash : '';
      const element = getElementFromHash(normalizedHash);

      if (!normalizedHash || !element) {
        hashLock = null;
        return;
      }

      hashLock = {
        anchorScrollY: window.scrollY,
        element,
        hash: normalizedHash,
        pending: true
      };

      deferAfterNavigation(() => {
        if (window.location.hash !== normalizedHash) {
          return;
        }

        const currentElement = getElementFromHash(normalizedHash);

        if (!currentElement) {
          hashLock = null;
          return;
        }

        hashLock = {
          anchorScrollY: window.scrollY,
          element: currentElement,
          hash: normalizedHash,
          pending: false
        };
      });
    }

    function isHashLockActive() {
      if (!hashLock) {
        return false;
      }

      if (!hashLock.element.isConnected || window.location.hash !== hashLock.hash) {
        hashLock = null;
        return false;
      }

      if (hashLock.pending) {
        return true;
      }

      if (Math.abs(window.scrollY - hashLock.anchorScrollY) < getHashUnlockDistance()) {
        return true;
      }

      hashLock = null;
      return false;
    }

    function syncUrlToSection(href) {
      if (!href || isHashLockActive() || window.location.hash === href) {
        return;
      }

      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}${href}`
      );
    }

    function syncFromHash() {
      const currentHash = window.location.hash;

      if (!currentHash || !sectionHashes.has(currentHash)) {
        return false;
      }

      setActiveLink(currentHash);
      return true;
    }

    function findActiveSectionHref() {
      const scrollOffset = getScrollOffset();
      let nextActiveHref = '';

      for (const section of sections) {
        if (section.heading.getBoundingClientRect().top <= scrollOffset) {
          nextActiveHref = section.href;
          continue;
        }

        break;
      }

      return nextActiveHref;
    }

    function syncFromScroll(updateUrl = true) {
      const nextActiveHref = findActiveSectionHref();

      setActiveLink(nextActiveHref);

      if (updateUrl) {
        syncUrlToSection(nextActiveHref);
      }
    }

    function scheduleSyncFromScroll(updateUrl = true) {
      if (syncFrame) {
        return;
      }

      syncFrame = window.requestAnimationFrame(() => {
        syncFrame = 0;
        syncFromScroll(updateUrl);
      });
    }

    globalThis.delegateEvent('click', 'a[href^="#"]', (_event, link) => {
      const href = link.getAttribute('href') || '';

      if (href.length > 1) {
        queueHashLock(href);
      }
    }, { passive: true });

    globalThis.delegateEvent('click', '#toc a', (_event, link) => {
      setActiveLink(link.getAttribute('href') || '');
      closeNavigation();
    }, { passive: true });

    window.addEventListener('hashchange', () => {
      queueHashLock(window.location.hash);

      if (!syncFromHash()) {
        scheduleSyncFromScroll(false);
      }

      closeNavigation();
    });

    window.addEventListener('scroll', scheduleSyncFromScroll, { passive: true });
    window.addEventListener('resize', () => {
      scheduleSyncFromScroll(false);
    });
    window.addEventListener('load', () => {
      scheduleSyncFromScroll(false);
    });

    if (content && typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(() => {
        scheduleSyncFromScroll(false);
      });

      resizeObserver.observe(content);
    }

    queueHashLock(window.location.hash);

    if (!syncFromHash()) {
      syncFromScroll(false);
    }

    return {
      syncFromScroll: scheduleSyncFromScroll
    };
  }

  createTocController();
  const themeController = createThemeController();
  createMermaidController(themeController);

  const source = specConfig.source;

  if (source && source.host === 'github' && source.account && source.repo) {
    const issueBrowser = createGithubIssueBrowser(source);

    if (issueBrowser) {
      issueBrowser.loadBaseIssues();
    }
  }

  const tipMap = new WeakMap();

  globalThis.delegateEvent('pointerover', '.term-reference, .spec-reference', (event, anchor) => {
    const id = anchor.getAttribute('data-local-href') || anchor.getAttribute('href') || '';
    const term = document.getElementById(id.replace('#', ''));

    if (!term || tipMap.has(anchor)) {
      return;
    }

    const container = term.closest('dt, td:first-child');

    if (!container) {
      return;
    }

    const tip = {
      allowHTML: true,
      inlinePositioning: true
    };

    switch (container.tagName) {
      case 'DT':
        tip.content = container.nextElementSibling.textContent;
        break;
      case 'TD': {
        const table = container.closest('table');
        const rowCells = Array.from(container.closest('tr').children);
        rowCells.shift();

        if (table) {
          const headings = Array.from(table.querySelectorAll('thead th'));
          headings.shift();

          if (headings.length) {
            tip.content = `
              <header>${container.textContent}</header>
              <table>
                ${headings.map((heading, index) => {
                  return `<tr><td>${heading.textContent}:</td><td>${rowCells[index] ? rowCells[index].textContent : ''}</td></tr>`;
                }).join('')}
              </table>
            `;
          }
        }
        break;
      }
    }

    if (tip.content) {
      tipMap.set(anchor, tippy(anchor, tip));
    }
  }, { passive: true });
})();
