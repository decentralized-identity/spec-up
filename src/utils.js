import fs from 'node:fs';
import path from 'node:path';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function slugifyTerm(value) {
  return String(value).trim().replace(/\s+/g, '-').toLowerCase();
}

function normalizeSpec(specConfig, projectRoot) {
  return {
    ...specConfig,
    config: specConfig,
    markdownPaths: specConfig.markdown_paths || ['spec.md'],
    specDirectory: path.resolve(projectRoot, specConfig.spec_directory || '.'),
    destination: path.resolve(projectRoot, specConfig.output_path || specConfig.spec_directory || '.')
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function unwrapDefault(mod) {
  return mod && mod.default ? mod.default : mod;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isRemoteUrl(value) {
  return /^https?:\/\//i.test(String(value || ''));
}

const FAVICON_ENDPOINT = 'https://www.google.com/s2/favicons';
const FAVICON_SIZE = 64;

// Collapse paths so `/spec`, `/spec/`, and `/spec/index.html` compare equal,
// since fragments and query strings never change which document a link targets.
function normalizePath(pathname) {
  const withoutIndex = String(pathname || '/').replace(/index\.html?$/i, '');
  const trimmed = withoutIndex.length > 1 ? withoutIndex.replace(/\/$/, '') : withoutIndex;
  return trimmed || '/';
}

// User/org profile links read as a person, not a site, so a site favicon adds
// noise rather than meaning. These are recognized purely by path shape: a
// GitHub profile is a single segment (github.com/<user>) and a LinkedIn profile
// is exactly /in/<user>. Anything deeper (a repo, a sub-page) keeps its favicon.
function isUserProfileLink(hostname, pathname) {
  const bareHost = hostname.replace(/^www\./, '');
  const segments = pathname.split('/').filter(Boolean);

  if (bareHost === 'github.com') {
    return segments.length === 1;
  }

  if (bareHost === 'linkedin.com') {
    return segments.length === 2 && segments[0] === 'in';
  }

  return false;
}

// Returns a function that, given a link href, produces the inline
// `style="--favicon:url('…')"` attribute (with a trailing space) used by the
// `a[style*="--favicon"]` CSS rule — or '' when no favicon applies. Links get a
// favicon unless they are non-http(s), or self-referential to the canonical URL
// (same host + path, ignoring hash/query). Relative links are only resolvable —
// and so only decorated — when a canonical URL is configured.
function createFaviconStyler(canonical) {
  let canonicalBase = null;
  let canonicalHost = null;
  let canonicalPath = null;

  if (canonical) {
    try {
      const parsed = new URL(canonical);

      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        canonicalBase = parsed;
        canonicalHost = parsed.host.toLowerCase();
        canonicalPath = normalizePath(parsed.pathname);
      }
    }
    catch {
      // Ignore a malformed canonical URL and behave as if none was set.
    }
  }

  return function faviconStyle(href) {
    if (!href) {
      return '';
    }

    let url = null;

    try {
      url = new URL(href);
    }
    catch {
      // Relative links are only resolvable when we know the document's own URL.
      if (canonicalBase) {
        try {
          url = new URL(href, canonicalBase);
        }
        catch {
          return '';
        }
      }
    }

    if (!url || (url.protocol !== 'http:' && url.protocol !== 'https:')) {
      return '';
    }

    const host = url.host.toLowerCase();

    // Self-referential: same document as the canonical URL, ignoring hash/query.
    if (canonicalHost && host === canonicalHost && normalizePath(url.pathname) === canonicalPath) {
      return '';
    }

    if (isUserProfileLink(url.hostname.toLowerCase(), url.pathname)) {
      return '';
    }

    return `style="--favicon:url('${FAVICON_ENDPOINT}?domain=${url.hostname}&amp;sz=${FAVICON_SIZE}')" `;
  };
}

function resolveProjectFile(projectRoot, filePath) {
  if (!filePath || isRemoteUrl(filePath)) {
    return null;
  }

  if (path.isAbsolute(filePath)) {
    const projectRelativePath = path.join(projectRoot, filePath.replace(/^\/+/, ''));

    if (fs.existsSync(projectRelativePath)) {
      return projectRelativePath;
    }

    return filePath;
  }

  return path.resolve(projectRoot, filePath);
}

function relativeTo(root, filePath) {
  return path.relative(root, filePath) || '.';
}

export {
  createFaviconStyler,
  escapeHtml,
  isRemoteUrl,
  normalizeSpec,
  readJson,
  relativeTo,
  resolveProjectFile,
  slugifyTerm,
  unique,
  unwrapDefault
};
