(function() {
  const storageKey = 'spec-up-color-scheme';
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
