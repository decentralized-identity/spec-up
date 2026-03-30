'use strict';

const { escapeHtml } = require('./utils');
const THEME_STORAGE_KEY = 'spec-up-color-scheme';

function buildGithubUrls(source) {
  if (!source || source.host !== 'github' || !source.account || !source.repo) {
    return null;
  }

  const repositoryPath = `${source.account}/${source.repo}`;
  const repoUrl = `https://github.com/${repositoryPath}`;

  return {
    commitsUrl: `${repoUrl}/commits`,
    issuesUrl: `${repoUrl}/issues`,
    repoLabel: repositoryPath,
    repoUrl
  };
}

function buildThemeBootstrapScript() {
  return `
    <script>
      (() => {
        const storageKey = '${THEME_STORAGE_KEY}';
        const root = document.documentElement;
        const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        let themePreference = 'auto';

        try {
          const storedThemePreference = window.localStorage.getItem(storageKey);

          if (storedThemePreference === 'light' || storedThemePreference === 'dark' || storedThemePreference === 'auto') {
            themePreference = storedThemePreference;
          }
        }
        catch {}

        const theme = themePreference === 'auto'
          ? (media && media.matches ? 'dark' : 'light')
          : themePreference;

        root.classList.remove('wa-light', 'wa-dark');
        root.classList.add(theme === 'dark' ? 'wa-dark' : 'wa-light');
        root.dataset.theme = theme;
        root.dataset.themePreference = themePreference;
        root.style.colorScheme = theme;
      })();
    </script>
  `;
}

function buildPageHtml({
  articleHtml,
  assetTags,
  externalReferencesHtml,
  spec,
  tocHtml
}) {
  const features = ['logo', 'source'].filter(feature => Boolean(spec[feature])).join(' ');
  const externalMarkup = externalReferencesHtml ? `<div style="display: none;">${externalReferencesHtml}</div>` : '';
  const githubUrls = buildGithubUrls(spec.source);
  const logoMarkup = spec.logo
    ? `<a class="spec-up-brand-mark spec-up-brand-mark--logo" href="${spec.logo_link || '#_'}"><img src="${spec.logo}" alt="${escapeHtml(spec.title)} logo"/></a>`
    : '<span class="spec-up-brand-mark spec-up-brand-mark--placeholder" aria-hidden="true">SU</span>';
  const tocMarkup = tocHtml || '<p class="spec-up-empty-state">Section links appear here when the spec has headings.</p>';
  const issuesDrawerMarkup = githubUrls
    ? `
      <wa-drawer id="repo_issues_drawer" class="spec-up-issues-drawer" label="GitHub Issues" placement="end" light-dismiss>
        <div slot="label" class="spec-up-drawer-title">
          <div class="spec-up-drawer-title-row">
            <div class="spec-up-drawer-heading">
              <span>GitHub Issues</span>
            </div>
            <div class="spec-up-drawer-title-actions"></div>
          </div>
          <div class="spec-up-issues-search-row">
            <wa-input id="repo_issue_search" type="search" placeholder="Search open issues" autocomplete="off" spellcheck="false" size="small">
              <wa-icon slot="start" name="search" label="Search GitHub issues"></wa-icon>
              <span slot="end" class="spec-up-issues-search-end">
                <span id="repo_issue_search_spinner" class="spec-up-issues-search-spinner" hidden aria-hidden="true">
                  <wa-spinner></wa-spinner>
                </span>
                <button id="repo_issue_search_clear" type="button" aria-label="Clear issue search" disabled>Clear</button>
              </span>
            </wa-input>
          </div>
        </div>
        <div id="repo_issue_panel" class="spec-up-issues-panel">
          <p id="repo_issue_status">Loading open GitHub issues…</p>
          <ul id="repo_issue_list" class="spec-up-issue-list"></ul>
          <div id="repo_issue_load_more" class="spec-up-issues-loading" hidden>
            <wa-spinner></wa-spinner>
            <span>Loading more issues…</span>
          </div>
        </div>
      </wa-drawer>
    `
    : '';
  const issuesButtonMarkup = githubUrls
    ? `
        <wa-button class="spec-up-issues-trigger" size="small" appearance="outlined" variant="neutral" data-drawer="open repo_issues_drawer">
          <wa-icon family="brands" name="github"></wa-icon>
          Issues
        </wa-button>
    `
    : '';
  const headerActionsMarkup = `
      <div class="spec-up-header-actions">
        <wa-dropdown id="spec_up_theme_selector" class="spec-up-theme-selector color-scheme-selector" size="small" placement="bottom-start">
          <wa-button
            slot="trigger"
            id="color-scheme-selector-trigger"
            class="spec-up-theme-selector__trigger"
            appearance="plain"
            aria-label="Color theme"
            variant="neutral"
            size="small"
          >
            <wa-icon family="classic" name="sun" class="icon-embiggen only-light" aria-hidden="true"></wa-icon>
            <wa-icon family="classic" name="moon" class="icon-embiggen only-dark" aria-hidden="true"></wa-icon>
          </wa-button>
          <wa-dropdown-item value="light">
            <wa-icon slot="icon" family="classic" name="sun" class="icon-embiggen" aria-hidden="true"></wa-icon>
            Light
          </wa-dropdown-item>
          <wa-dropdown-item value="dark">
            <wa-icon slot="icon" family="classic" name="moon" class="icon-embiggen" aria-hidden="true"></wa-icon>
            Dark
          </wa-dropdown-item>
          <wa-divider></wa-divider>
          <wa-dropdown-item value="auto">
            <wa-icon slot="icon" family="classic" name="sun" class="only-light icon-embiggen" aria-hidden="true"></wa-icon>
            <wa-icon slot="icon" family="classic" name="moon" class="only-dark icon-embiggen" aria-hidden="true"></wa-icon>
            System
          </wa-dropdown-item>
        </wa-dropdown>
        ${issuesButtonMarkup}
      </div>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en" class="wa-theme-default">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="color-scheme" content="light dark">

        <title>${escapeHtml(spec.title)}</title>

        ${spec.logo ? `<link rel="icon" href="${spec.logo}">` : ''}

        ${buildThemeBootstrapScript()}
        ${assetTags.head}
      </head>
      <body features="${features}">
        ${assetTags.svg}

        <wa-page class="spec-up-shell" mobile-breakpoint="1080" disable-navigation-toggle>
          <span slot="skip-to-content">Skip to specification content</span>

          <header slot="header" id="app_header">
            <div class="spec-up-brand">
              <wa-button data-toggle-nav size="small" appearance="plain" variant="neutral" class="spec-up-nav-toggle" aria-label="Open table of contents">
                <wa-icon name="bars"></wa-icon>
              </wa-button>
              ${logoMarkup}
              <div class="spec-up-brand-copy">
                <strong>${escapeHtml(spec.title)}</strong>
              </div>
            </div>
            ${headerActionsMarkup}
          </header>

          <div slot="navigation-header" class="spec-up-navigation-title">
            <strong>${escapeHtml(spec.title)}</strong>
          </div>

          <nav id="toc" slot="navigation" aria-label="Table of contents">
            ${tocMarkup}
          </nav>

          <main class="spec-up-main">
            <article id="content">
              ${articleHtml}
            </article>
          </main>
        </wa-page>

        ${issuesDrawerMarkup}

        ${externalMarkup}
        <script>window.specConfig = ${JSON.stringify(spec.config)}</script>
        ${assetTags.body}
      </body>
    </html>
  `;
}

module.exports = {
  buildPageHtml
};
