import { Middleware } from "@reduxjs/toolkit";

// chrome.storage.sync allows 120 writes per minute, so quick changes
// (e.g. dragging a slider) are batched into one write
const WRITE_DELAY = 500;

let pending: Record<string, unknown> = {};
let timer: ReturnType<typeof setTimeout> | undefined;

const flush = () => {
  clearTimeout(timer);
  timer = undefined;

  if (Object.keys(pending).length === 0) return;

  const items = pending;
  pending = {};

  chrome.storage.sync.set(items).catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to save settings", error);
  });
};

// Save pending changes when the options page is closed
window.addEventListener("pagehide", flush);

/**
 * Saves settings setter actions (settings/setPopupWidth etc.) in chrome.storage.sync
 * under the setting name (popupWidth etc.)
 */
const saveChromeStorage: Middleware = () => (next) => (action) => {
  const result = next(action);
  const setting = /^settings\/set(\w+)$/.exec(action.type)?.[1];

  if (setting) {
    const key = setting.charAt(0).toLowerCase() + setting.slice(1);

    pending[key] = action.payload;
    clearTimeout(timer);
    timer = setTimeout(flush, WRITE_DELAY);
  }

  return result;
};

export default saveChromeStorage;
