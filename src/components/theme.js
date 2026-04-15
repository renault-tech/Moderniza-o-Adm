/* theme.js - preferencia local de tema */

(function () {
  var STORAGE_KEY = 'modernizacao_theme';

  function normalizeTheme(theme) {
    if (theme === 'dark' || theme === 'light') return theme;
    return null;
  }

  function getStoredTheme() {
    try {
      return normalizeTheme(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function getActiveTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    var normalized = normalizeTheme(theme);
    if (normalized) {
      document.documentElement.setAttribute('data-theme', normalized);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.documentElement.setAttribute('data-active-theme', getActiveTheme());
  }

  function setTheme(theme) {
    var normalized = normalizeTheme(theme);
    if (!normalized) return getActiveTheme();

    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch (e) {}

    applyTheme(normalized);
    return normalized;
  }

  function toggleTheme() {
    var next = getActiveTheme() === 'dark' ? 'light' : 'dark';
    return setTheme(next);
  }

  applyTheme(getStoredTheme());

  if (window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemThemeChange = function () {
      if (!getStoredTheme()) applyTheme(null);
    };

    if (media.addEventListener) {
      media.addEventListener('change', onSystemThemeChange);
    } else if (media.addListener) {
      media.addListener(onSystemThemeChange);
    }
  }

  window.getActiveTheme = getActiveTheme;
  window.setTheme = setTheme;
  window.toggleTheme = toggleTheme;
})();
