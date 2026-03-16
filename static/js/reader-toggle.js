/**
 * Reader mode toggle for Lucerna investigation articles.
 * Switches between normal (Blowfish) and declassified (paper) views.
 * Uses sessionStorage (no cookie consent needed — session-only, functional).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'lucerna-reader-mode';
  var btn = document.getElementById('reader-toggle');
  if (!btn) return;

  var normalView = document.getElementById('view-normal');
  var declassifiedView = document.getElementById('view-declassified');
  if (!normalView || !declassifiedView) return;

  function applyMode(active) {
    if (active) {
      normalView.hidden = true;
      declassifiedView.hidden = false;
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = btn.dataset.labelOff || 'Normal view';
    } else {
      normalView.hidden = false;
      declassifiedView.hidden = true;
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = btn.dataset.labelOn || 'Reader view';
    }
  }

  // Restore preference from session
  var stored = sessionStorage.getItem(STORAGE_KEY);
  var isActive = stored === 'true';
  applyMode(isActive);

  btn.addEventListener('click', function () {
    isActive = !isActive;
    applyMode(isActive);
    sessionStorage.setItem(STORAGE_KEY, String(isActive));
  });
})();
