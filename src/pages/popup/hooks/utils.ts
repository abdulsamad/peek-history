import { flushSync } from "react-dom";

import { ISettings } from "@src/commons/redux/settings/defaults";
import {
  tabsAccordionSelector,
  windowItemSelector,
} from "./useKeyboardShortcuts";

export const onURLClick = async (
  url: string,
  openURL: ISettings["openURL"]
) => {
  // Open link in new tab
  if (openURL === "new-tab") {
    await chrome.tabs.create({ url });
    return;
  } else if (openURL === "background-tab") {
    await chrome.tabs.create({ url, active: false });
    return;
  }

  // Open link in current tab
  await chrome.tabs.update({ url });
};

// Click the accordion headers that are not in the wanted state. flushSync renders
// each change right away, so newly shown windows and tabs can be queried after.
const setAccordions = (selector: string, expanded: boolean) => {
  document.querySelectorAll<HTMLElement>(selector).forEach((elem) => {
    if (elem.classList.contains("Mui-expanded") === expanded) return;

    flushSync(() => elem.click());
  });
};

// Open All MUI accordion in Tabs view
export const openAllTabsAccordions = () => {
  setAccordions(tabsAccordionSelector, true);

  // Open all window inside tabs
  setAccordions(windowItemSelector, true);
};

// Close All MUI accordions in Tabs view
export const closeAllTabsAccordions = () => {
  // Close all window inside tabs
  setAccordions(windowItemSelector, false);

  // Close all tabs accordions
  setAccordions(tabsAccordionSelector, false);
};
