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
