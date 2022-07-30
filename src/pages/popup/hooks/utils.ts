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

export const numberIterator = (
  start = -1,
  end = Infinity,
  resetVal = -1
): {
  value: () => number;
  reset: () => void;
  prev: () => { value: number; done: boolean };
  next: () => { value: number; done: boolean };
} => {
  let index = start;

  return {
    value: () => index,
    reset: () => (index = resetVal),
    prev: () =>
      index > 0
        ? { value: --index, done: false }
        : { value: index, done: true },
    next: () =>
      index < end
        ? { value: ++index, done: false }
        : { value: index, done: true },
  };
};

// Open All MUI accordion in Tabs view
export const openAllTabsAccordions = () => {
  document.querySelectorAll(tabsAccordionSelector).forEach((elem) => {
    // Check if accordion is already expanded
    if ((elem as HTMLElement).classList.contains("Mui-expanded")) return;

    // Click on the Accordion
    (elem as HTMLElement).click();
  });

  // Open all window inside tabs
  document.querySelectorAll(windowItemSelector).forEach((elem) => {
    // Check if accordion is already expanded
    if ((elem as HTMLElement).classList.contains("Mui-expanded")) return;

    // Click on the Accordion
    (elem as HTMLElement).click();
  });
};

// Close All MUI accordions in Tabs view
export const closeAllTabsAccordions = () => {
  // Close all window inside tabs
  document.querySelectorAll(windowItemSelector).forEach((elem) => {
    // Click on the Accordion
    (elem as HTMLElement).click();
  });

  // Close all tabs accordions
  document.querySelectorAll(tabsAccordionSelector).forEach((elem) => {
    // Click on the Accordion
    (elem as HTMLElement).click();
  });
};
