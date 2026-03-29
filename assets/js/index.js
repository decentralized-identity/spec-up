import mermaid from 'mermaid';

(function() {
  const page = document.querySelector('wa-page');
  const ISSUE_PAGE_SIZE = 20;

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

  function syncActiveTocLink() {
    const currentHash = window.location.hash;
    let activeLink = null;

    document.querySelectorAll('#toc a').forEach(link => {
      if (currentHash && link.getAttribute('href') === currentHash) {
        activeLink = link;
      }

      link.removeAttribute('aria-current');
    });

    if (activeLink) {
      activeLink.setAttribute('aria-current', 'location');
    }
  }

  globalThis.delegateEvent('click', '#toc a', () => {
    syncActiveTocLink();
    closeNavigation();
  }, { passive: true });

  window.addEventListener('hashchange', () => {
    syncActiveTocLink();
    closeNavigation();
  });

  syncActiveTocLink();

  const source = specConfig.source;

  if (source && source.host === 'github' && source.account && source.repo) {
    const issueBrowser = createGithubIssueBrowser(source);

    if (issueBrowser) {
      issueBrowser.loadBaseIssues();
    }
  }

  mermaid.initialize({
    startOnLoad: true,
    theme: 'neutral'
  });

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
