import { JSDOM } from 'jsdom';
import markdownItContainer from 'markdown-it-container';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItIns from 'markdown-it-ins';
import markdownItMark from 'markdown-it-mark';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItMultiTable from 'markdown-it-multimd-table';
import markdownItReferences from 'markdown-it-references';
import markdownItTextualUml from 'markdown-it-textual-uml';
import Prism from 'prismjs';
import markdownItChartModule from 'markdown-it-chart';
import markdownItIconsModule from 'markdown-it-icons';
import markdownItPrismModule from 'markdown-it-prism';
import { escapeHtml, unwrapDefault } from '../utils.js';

const markdownItChart = unwrapDefault(markdownItChartModule);
const markdownItIcons = unwrapDefault(markdownItIconsModule);
const markdownItPrism = unwrapDefault(markdownItPrismModule);

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

const PROGRESS_COMPONENTS = {
  bar: 'wa-progress-bar',
  ring: 'wa-progress-ring',
  'progress-bar': 'wa-progress-bar',
  'progress-ring': 'wa-progress-ring',
  'wa-progress-bar': 'wa-progress-bar',
  'wa-progress-ring': 'wa-progress-ring'
};
const RELATIVE_TIME_FORMATS = new Set(['long', 'short', 'narrow']);

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

function createTabGroup(document, tabs, activeIndex = 0) {
  const tabGroup = document.createElement('wa-tab-group');
  const usedNames = new Set();
  let activePanelName = '';

  tabGroup.className = 'spec-up-tab-group';

  tabs.forEach((tabDefinition, index) => {
    const label = (tabDefinition.label || `Tab ${index + 1}`).trim() || `Tab ${index + 1}`;
    const panelName = createTabPanelName(label, index, usedNames);
    const tab = document.createElement('wa-tab');
    const panel = document.createElement('wa-tab-panel');

    tab.setAttribute('panel', panelName);
    tab.textContent = label;

    panel.setAttribute('name', panelName);

    for (const node of tabDefinition.nodes || []) {
      panel.append(node);
    }

    if (index === activeIndex) {
      activePanelName = panelName;
    }

    tabGroup.append(tab, panel);
  });

  if (activePanelName) {
    tabGroup.setAttribute('active', activePanelName);
  }

  return tabGroup;
}

function createCarousel(document, slides) {
  const carousel = document.createElement('wa-carousel');

  carousel.className = 'spec-up-carousel';
  carousel.setAttribute('loop', '');
  carousel.setAttribute('navigation', '');
  carousel.setAttribute('pagination', '');
  carousel.setAttribute('mouse-dragging', '');

  slides.forEach(slideDefinition => {
    const item = document.createElement('wa-carousel-item');

    for (const node of slideDefinition.nodes || []) {
      item.append(node);
    }

    carousel.append(item);
  });

  return carousel;
}

function convertLegacyTabPanels(document) {
  for (const legacyGroup of document.querySelectorAll('tab-panels')) {
    const legacyNav = Array.from(legacyGroup.children).find(child => child.tagName === 'NAV');
    const legacyTabs = legacyNav ? Array.from(legacyNav.children) : [];
    const legacyPanels = Array.from(legacyGroup.children).filter(child => child.tagName === 'SECTION');
    const selectedIndex = Number.parseInt(legacyGroup.getAttribute('selected-index') || '0', 10);
    const activeIndex = Number.isNaN(selectedIndex) ? 0 : Math.max(0, Math.min(selectedIndex, legacyPanels.length - 1));
    const tabs = legacyPanels.map((legacyPanel, index) => ({
      label: (legacyTabs[index]?.textContent || `Tab ${index + 1}`).trim(),
      nodes: Array.from(legacyPanel.childNodes)
    }));
    const tabGroup = createTabGroup(document, tabs, activeIndex);

    legacyGroup.replaceWith(tabGroup);
  }
}

function getTabsFenceLabel(element) {
  if (!element || element.tagName !== 'P') {
    return null;
  }

  const match = element.textContent.trim().match(/^::\s+(.+?)\s*$/);

  return match ? match[1] : null;
}

function isTabsFenceOpen(element) {
  return Boolean(element && element.tagName === 'P' && /^:::\s+tabs\s*$/i.test(element.textContent.trim()));
}

function isTabsFenceClose(element) {
  return Boolean(element && element.tagName === 'P' && /^:::\s*$/.test(element.textContent.trim()));
}

function isCarouselFenceOpen(element) {
  return Boolean(element && element.tagName === 'P' && /^:::\s+carousel\s*$/i.test(element.textContent.trim()));
}

function isCarouselSlideSeparator(element) {
  return Boolean(element && element.tagName === 'P' && /^::\s*$/.test(element.textContent.trim()));
}

function convertTabsFenceAt(openMarker) {
  const document = openMarker.ownerDocument;
  const headerMarkers = [];
  const tabs = [];
  let closeMarker = null;
  let currentTab = null;
  let cursor = openMarker.nextElementSibling;

  while (cursor) {
    const next = cursor.nextElementSibling;

    if (isTabsFenceClose(cursor)) {
      closeMarker = cursor;
      break;
    }

    const label = getTabsFenceLabel(cursor);

    if (label) {
      currentTab = {
        label,
        nodes: []
      };
      headerMarkers.push(cursor);
      tabs.push(currentTab);
      cursor = next;
      continue;
    }

    if (!currentTab) {
      return null;
    }

    currentTab.nodes.push(cursor);
    cursor = next;
  }

  if (!closeMarker || tabs.length === 0) {
    return null;
  }

  const tabGroup = createTabGroup(document, tabs, 0);

  openMarker.replaceWith(tabGroup);

  for (const headerMarker of headerMarkers) {
    headerMarker.remove();
  }

  closeMarker.remove();

  return tabGroup;
}

function convertCarouselFenceAt(openMarker) {
  const document = openMarker.ownerDocument;
  const separatorMarkers = [];
  const slides = [{
    nodes: []
  }];
  let closeMarker = null;
  let currentSlide = slides[0];
  let cursor = openMarker.nextElementSibling;

  while (cursor) {
    const next = cursor.nextElementSibling;

    if (isTabsFenceClose(cursor)) {
      closeMarker = cursor;
      break;
    }

    if (isCarouselSlideSeparator(cursor)) {
      currentSlide = {
        nodes: []
      };
      separatorMarkers.push(cursor);
      slides.push(currentSlide);
      cursor = next;
      continue;
    }

    currentSlide.nodes.push(cursor);
    cursor = next;
  }

  const populatedSlides = slides.filter(slide => slide.nodes.length > 0);

  if (!closeMarker || populatedSlides.length === 0) {
    return null;
  }

  const carousel = createCarousel(document, populatedSlides);

  openMarker.replaceWith(carousel);

  for (const separatorMarker of separatorMarkers) {
    separatorMarker.remove();
  }

  closeMarker.remove();

  return carousel;
}

function convertTabsFenceMarkup(root) {
  let child = root.firstElementChild;

  while (child) {
    if (isTabsFenceOpen(child)) {
      const replacement = convertTabsFenceAt(child);

      if (replacement) {
        convertTabsFenceMarkup(replacement);
        child = replacement.nextElementSibling;
        continue;
      }
    }

    convertTabsFenceMarkup(child);
    child = child.nextElementSibling;
  }
}

function convertCarouselFenceMarkup(root) {
  let child = root.firstElementChild;

  while (child) {
    if (isCarouselFenceOpen(child)) {
      const replacement = convertCarouselFenceAt(child);

      if (replacement) {
        convertCarouselFenceMarkup(replacement);
        child = replacement.nextElementSibling;
        continue;
      }
    }

    convertCarouselFenceMarkup(child);
    child = child.nextElementSibling;
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
  if (!html.includes('<tab-panels') && !html.includes('class="chartjs"') && !html.includes('::: tabs') && !html.includes('::: carousel')) {
    return html;
  }

  const dom = new JSDOM(`<body>${html}</body>`);
  const { document } = dom.window;

  convertCarouselFenceMarkup(document.body);
  convertTabsFenceMarkup(document.body);
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
    ? `<wa-icon library="spec-up" slot="icon" name="${config.icon}" label="${escapeHtml(type)}"></wa-icon>`
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

function renderDetailsOpenTag(summary) {
  const normalizedSummary = String(summary || '').trim() || 'Details';

  return `<wa-details class="spec-up-details" summary="${escapeHtml(normalizedSummary)}">`;
}

function renderBadge(text, variant) {
  const label = String(text || '').trim();

  if (!label) {
    return '';
  }

  const normalizedVariant = String(variant || '').trim() || 'brand';

  return `<wa-badge variant="${escapeHtml(normalizedVariant)}">${escapeHtml(label)}</wa-badge>`;
}

function formatProgressValue(value) {
  return Number.isInteger(value) ? String(value) : String(value).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
}

function normalizeProgressSize(size) {
  const normalizedSize = String(size || '').trim();

  if (!normalizedSize) {
    return '';
  }

  return /^(?:0|(?:\d+|\d*\.\d+)(?:%|[a-z]+))$/i.test(normalizedSize) ? normalizedSize : '';
}

function renderProgress(type, value, sizeOrLabel, label) {
  const tagName = PROGRESS_COMPONENTS[String(type || '').trim().toLowerCase()];
  const parsedValue = Number.parseFloat(String(value || '').trim());

  if (!tagName || !Number.isFinite(parsedValue)) {
    return '';
  }

  const normalizedValue = formatProgressValue(Math.max(0, Math.min(100, parsedValue)));
  const defaultLabel = `${normalizedValue}%`;
  const normalizedSize = normalizeProgressSize(sizeOrLabel);
  const labelSource = label === undefined && !normalizedSize ? sizeOrLabel : label;
  const normalizedLabel = (labelSource == null ? '' : String(labelSource)).trim() || defaultLabel;
  const styleAttribute = normalizedSize
    ? tagName === 'wa-progress-ring'
      ? ` style="--size: ${escapeHtml(normalizedSize)};"`
      : ` style="width: ${escapeHtml(normalizedSize)};"`
    : '';

  return `<${tagName} value="${escapeHtml(normalizedValue)}"${styleAttribute}>${escapeHtml(normalizedLabel)}</${tagName}>`;
}

function renderRelativeTime(date, format) {
  const normalizedDate = String(date || '').trim();
  const normalizedFormat = String(format || '').trim().toLowerCase();

  if (!normalizedDate) {
    return '';
  }

  const formatAttribute = RELATIVE_TIME_FORMATS.has(normalizedFormat)
    ? ` format="${escapeHtml(normalizedFormat)}"`
    : '';

  return `<wa-relative-time date="${escapeHtml(normalizedDate)}"${formatAttribute}></wa-relative-time>`;
}

function renderCopyLine(text, state) {
  const normalizedText = String(text || '').trim();

  if (!normalizedText) {
    return '';
  }

  const nextIndex = (state.copyLineCount || 0) + 1;
  const copyTargetId = `spec-up-copy-target-${nextIndex}`;

  state.copyLineCount = nextIndex;

  return `<span class="spec-up-copy-line"><span class="spec-up-copy-text" id="${copyTargetId}">${escapeHtml(normalizedText)}</span><wa-copy-button class="spec-up-copy-button" from="${copyTargetId}" copy-label="Copy" success-label="Copied" error-label="Copy failed"></wa-copy-button></span>`;
}

function renderQrCode(value, size) {
  const normalizedValue = String(value || '').trim();
  const normalizedSize = String(size || '').trim();
  const parsedSize = Number.parseInt(normalizedSize, 10);

  if (!normalizedValue) {
    return '';
  }

  const sizeAttribute = Number.isFinite(parsedSize) && parsedSize > 0
    ? ` size="${escapeHtml(String(parsedSize))}"`
    : '';

  return `<wa-qr-code value="${escapeHtml(normalizedValue)}"${sizeAttribute}></wa-qr-code>`;
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
      state.copyLineCount = 0;
    },
    markdownTemplates({ state } = {}) {
      const copyState = state || { copyLineCount: 0 };

      return [
        {
          filter(type) {
            return type === 'badge';
          },
          render(token, type, text, variant) {
            return renderBadge(text, variant);
          }
        },
        {
          filter(type) {
            return type === 'progress';
          },
          render(token, type, progressType, value, size, label) {
            return renderProgress(progressType, value, size, label);
          }
        },
        {
          filter(type) {
            return type === 'time';
          },
          render(token, type, date, format) {
            return renderRelativeTime(date, format);
          }
        },
        {
          filter(type) {
            return type === 'copy';
          },
          render(token, type, text) {
            return renderCopyLine(text, copyState);
          }
        },
        {
          filter(type) {
            return type === 'qr';
          },
          render(token, type, value, size) {
            return renderQrCode(value, size);
          }
        }
      ];
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
      md.use(markdownItContainer, 'summary', {
        render(tokens, idx) {
          const token = tokens[idx];
          const summary = token.info.trim().replace(/^summary(?:\s+|$)/i, '');

          if (token.nesting !== 1) {
            return '</wa-details>\n';
          }

          return `${renderDetailsOpenTag(summary)}\n`;
        },
        validate(params) {
          return /^summary(?:\s+.*)?$/i.test(params.trim());
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

export default createCoreMarkdownPlugin;
