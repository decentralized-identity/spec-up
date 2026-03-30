'use strict';

const { JSDOM } = require('jsdom');
const markdownItContainer = require('markdown-it-container');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItIns = require('markdown-it-ins');
const markdownItMark = require('markdown-it-mark');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const markdownItTaskLists = require('markdown-it-task-lists');
const markdownItMultiTable = require('markdown-it-multimd-table');
const markdownItReferences = require('markdown-it-references');
const markdownItTextualUml = require('markdown-it-textual-uml');
const Prism = require('prismjs');
const { escapeHtml, unwrapDefault } = require('../utils');

const markdownItChart = unwrapDefault(require('markdown-it-chart'));
const markdownItIcons = unwrapDefault(require('markdown-it-icons'));
const markdownItPrism = unwrapDefault(require('markdown-it-prism'));

const NOTICE_CONFIG = {
  example: {
    icon: null,
    variant: 'neutral'
  },
  issue: {
    icon: 'circle-exclamation',
    variant: 'danger'
  },
  note: {
    icon: 'circle-info',
    variant: 'brand'
  },
  todo: {
    icon: 'circle-check',
    variant: 'warning'
  },
  warning: {
    icon: 'triangle-exclamation',
    variant: 'warning'
  }
};

function slugifyHeading(value) {
  const base = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return base || 'section';
}

function createTabPanelName(label, index, usedNames) {
  const fallback = `tab-${index + 1}`;
  const base = label ? slugifyHeading(label) : fallback;
  let name = base;
  let suffix = 1;

  while (usedNames.has(name)) {
    name = `${base}-${suffix++}`;
  }

  usedNames.add(name);

  return name;
}

function convertLegacyTabPanels(document) {
  for (const legacyGroup of document.querySelectorAll('tab-panels')) {
    const tabGroup = document.createElement('wa-tab-group');
    const legacyNav = Array.from(legacyGroup.children).find(child => child.tagName === 'NAV');
    const legacyTabs = legacyNav ? Array.from(legacyNav.children) : [];
    const legacyPanels = Array.from(legacyGroup.children).filter(child => child.tagName === 'SECTION');
    const selectedIndex = Number.parseInt(legacyGroup.getAttribute('selected-index') || '0', 10);
    const activeIndex = Number.isNaN(selectedIndex) ? 0 : Math.max(0, Math.min(selectedIndex, legacyPanels.length - 1));
    const usedNames = new Set();
    let activePanelName = '';

    tabGroup.className = 'spec-up-tab-group';

    legacyPanels.forEach((legacyPanel, index) => {
      const label = (legacyTabs[index]?.textContent || `Tab ${index + 1}`).trim();
      const panelName = createTabPanelName(label, index, usedNames);
      const tab = document.createElement('wa-tab');
      const panel = document.createElement('wa-tab-panel');

      tab.setAttribute('panel', panelName);
      tab.textContent = label;

      panel.setAttribute('name', panelName);

      while (legacyPanel.firstChild) {
        panel.append(legacyPanel.firstChild);
      }

      if (index === activeIndex) {
        activePanelName = panelName;
      }

      tabGroup.append(tab, panel);
    });

    if (activePanelName) {
      tabGroup.setAttribute('active', activePanelName);
    }

    legacyGroup.replaceWith(tabGroup);
  }
}

function normalizeChartType(value) {
  const type = String(value || '').trim();

  if (!type) {
    return 'Chart';
  }

  return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}

function buildChartLabel(chartType) {
  return chartType === 'Chart' ? chartType : `${chartType} chart`;
}

function convertLegacyCharts(document) {
  for (const legacyChart of document.querySelectorAll('canvas.chartjs')) {
    let chartConfig;

    try {
      chartConfig = JSON.parse(legacyChart.textContent || '{}');
    }
    catch {
      continue;
    }

    const chartType = normalizeChartType(chartConfig.type);
    const chart = document.createElement('wa-chart');
    const script = document.createElement('script');

    chart.className = 'spec-up-chart';
    chart.setAttribute('label', buildChartLabel(chartType));
    chart.setAttribute('description', 'Chart rendered from specification content.');
    script.setAttribute('type', 'application/json');
    script.textContent = JSON.stringify(chartConfig, null, 2);
    chart.append(script);
    legacyChart.replaceWith(chart);
  }
}

function transformLegacyMarkup(html) {
  if (!html.includes('<tab-panels') && !html.includes('class="chartjs"')) {
    return html;
  }

  const dom = new JSDOM(`<body>${html}</body>`);
  const { document } = dom.window;

  convertLegacyTabPanels(document);
  convertLegacyCharts(document);

  return document.body.innerHTML;
}

function renderToc(headings) {
  if (headings.length === 0) {
    return '';
  }

  let html = '<ul class="toc">';
  let currentLevel = 2;
  let needsClose = false;

  for (const heading of headings) {
    while (currentLevel < heading.level) {
      html += '<ul>';
      currentLevel += 1;
      needsClose = false;
    }

    while (currentLevel > heading.level) {
      html += '</li></ul>';
      currentLevel -= 1;
      needsClose = true;
    }

    if (needsClose) {
      html += '</li>';
    }

    html += `<li><a href="#${heading.slug}">${heading.title}</a>`;
    needsClose = true;
  }

  while (currentLevel > 2) {
    html += '</li></ul>';
    currentLevel -= 1;
  }

  return `${html}</li></ul>`;
}

function attachHeadingAnchors(md, state) {
  md.core.ruler.push('spec-up-toc', parserState => {
    const slugCounts = {};
    const headings = [];
    const levelCounts = {
      2: 0,
      3: 0,
      4: 0
    };

    for (let index = 0; index < parserState.tokens.length; index += 1) {
      const token = parserState.tokens[index];

      if (token.type !== 'heading_open') {
        continue;
      }

      const inlineToken = parserState.tokens[index + 1];
      const level = Number(token.tag.slice(1));

      if (!inlineToken || inlineToken.type !== 'inline') {
        continue;
      }

      const slugBase = slugifyHeading(inlineToken.content);
      const occurrence = slugCounts[slugBase] || 0;
      const slug = occurrence > 0 ? `${slugBase}-${occurrence}` : slugBase;

      slugCounts[slugBase] = occurrence + 1;
      token.attrSet('id', slug);

      if (level >= 2 && level <= 4) {
        levelCounts[level] += 1;
        headings.push({
          level,
          slug,
          title: inlineToken.content
        });
      }
    }

    state.toc = renderToc(headings);
    state.tocMeta = {
      count: headings.length,
      levelCounts
    };
  });

  md.renderer.rules.heading_open = function renderHeadingOpen(tokens, idx, options, env, self) {
    return `${self.renderToken(tokens, idx, options)}<span class="spec-up-heading-text">`;
  };

  md.renderer.rules.heading_close = function renderHeadingClose(tokens, idx, options, env, self) {
    const openToken = tokens[idx - 2];
    const id = openToken && typeof openToken.attrGet === 'function' ? openToken.attrGet('id') : null;
    const anchorMarkup = id ? `<a class="toc-anchor" href="#${id}">§</a>` : '';

    return `</span>${anchorMarkup}${self.renderToken(tokens, idx, options)}`;
  };
}

function ensureTableBodyMeta(md) {
  md.core.ruler.before('curly_attributes', 'spec-up-table-meta', parserState => {
    for (const token of parserState.tokens) {
      if (token.type === 'tbody_open' && !token.meta) {
        token.meta = { colsnum: 0 };
      }
    }
  });
}

function renderNoticeOpenTag(matches, state) {
  const type = matches[1];
  const title = matches[2] ? matches[2].trim() : '';
  const config = NOTICE_CONFIG[type];
  const titleMarkup = type === 'example' && title
    ? `<span class="spec-up-notice-title">${escapeHtml(title)}</span>`
    : '';
  const iconMarkup = config.icon
    ? `<wa-icon slot="icon" name="${config.icon}" label="${escapeHtml(type)}"></wa-icon>`
    : '';
  let id;

  if (title) {
    id = title.replace(/\s+/g, '-').toLowerCase();

    if (state.noticeTitles[id]) {
      id += `-${state.noticeTitles[id]++}`;
    }
    else {
      state.noticeTitles[id] = 1;
    }
  }
  else {
    id = `${type}-${state.noticeCounts[type]++}`;
  }

  return `<wa-callout id="${id}" class="spec-up-notice spec-up-notice--${type}" variant="${config.variant}" appearance="filled-outlined">${iconMarkup}<div class="spec-up-notice-heading"><a class="notice-link" href="#${id}">${escapeHtml(type.toUpperCase())}</a>${titleMarkup}</div>`;
}

function createCoreMarkdownPlugin() {
  return {
    name: 'core-markdown',
    async beforeRender({ state }) {
      state.noticeCounts = {
        example: 1,
        issue: 1,
        note: 1,
        todo: 1,
        warning: 1
      };
      state.noticeTitles = {};
      state.toc = '';
      state.tocMeta = {
        count: 0,
        levelCounts: {
          2: 0,
          3: 0,
          4: 0
        }
      };
    },
    configureMarkdownIt({ md, state }) {
      Prism.languages.chart = Prism.languages.chart || Prism.languages.json || Prism.languages.javascript;
      md.use(markdownItAttrs);
      ensureTableBodyMeta(md);
      md.use(markdownItChart);
      md.use(markdownItDeflist);
      md.use(markdownItReferences);
      md.use(markdownItIcons, 'font-awesome');
      md.use(markdownItIns);
      md.use(markdownItMark);
      md.use(markdownItTextualUml);
      md.use(markdownItSub);
      md.use(markdownItSup);
      md.use(markdownItTaskLists);
      md.use(markdownItMultiTable, {
        headerless: true,
        multiline: true,
        rowspan: true
      });
      md.use(markdownItContainer, 'notice', {
        render(tokens, idx) {
          const matches = tokens[idx].info.match(/(\w+)\s?(.*)?/);

          if (!matches) {
            return '</wa-callout>\n';
          }

          if (tokens[idx].nesting !== 1) {
            return '</wa-callout>\n';
          }

          return renderNoticeOpenTag(matches, state);
        },
        validate(params) {
          const matches = params.match(/(\w+)\s?(.*)?/);
          return Boolean(matches && state.noticeCounts[matches[1]]);
        }
      });
      md.use(markdownItPrism);
      attachHeadingAnchors(md, state);
    },
    transformRenderedHtml({ html }) {
      return transformLegacyMarkup(html);
    }
  };
}

module.exports = createCoreMarkdownPlugin;
