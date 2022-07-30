import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { ISettings } from "@src/commons/redux/settings/defaults";
import { useAppDispatch } from "@src/pages/options/redux/store";
import {
  Active,
  setSearchOpened,
  switchActiveView,
} from "../redux/ui/ui-slice";
import {
  closeAllTabsAccordions,
  numberIterator,
  openAllTabsAccordions,
} from "./utils";
import { deleteItem } from "../redux/history/thunks";
import { RootState } from "../redux/store";
import { onURLClick } from "../hooks/utils";

// History/Tab Item selector
export const historyItemSelector = '[data-history-item="true"]';
export const tabsAccordionSelector = '[data-tabs-accordion="true"]';
export const windowItemSelector = '[data-window-item="true"]';

const useKeyboardShortcuts = ({
  active,
  settings,
  tabs,
  history,
}: {
  active: Active;
  settings: ISettings;
  history: RootState["history"];
  tabs: RootState["tabs"];
}) => {
  const dispatch = useAppDispatch();

  const parentRef = useRef();
  const historyFocusNum = useRef(numberIterator());
  const tabFocusNum = useRef(numberIterator());

  // Open search
  useHotkeys("alt+s", () => {
    dispatch(setSearchOpened(true));
  });

  // Open History/extension home view
  useHotkeys("alt+h", () => {
    dispatch(switchActiveView(Active.HISTORY));
  });

  // Open Tab view
  useHotkeys("alt+t", () => {
    dispatch(switchActiveView(Active.TABS));
  });

  // Open extension settings page
  useHotkeys("alt+o", () => {
    chrome.runtime.openOptionsPage();
  });

  // Open nth number history/tab link
  for (let index = 0; index < 9; index++) {
    useHotkeys(`alt+${index + 1}`, () => {
      if (active === Active.HISTORY) {
        onURLClick(history.items[index].url as string, settings.openURL);
        return;
      } else if (active === Active.TABS) {
        // Whether selected item is window
        tabs.recent[index].window
          ? onURLClick(tabs.recent[index].window?.tabs[0].url, settings.openURL)
          : onURLClick(tabs.recent[index].tab.url, settings.openURL);
      }
    });
  }

  // TODO: Fix directly using DOM
  useHotkeys(
    "up",
    (ev) => {
      ev.preventDefault();

      if (active === Active.HISTORY && historyFocusNum.current.value() > 0) {
        const prevNum = historyFocusNum.current.prev().value;
        const elem = document.querySelectorAll(historyItemSelector)[
          prevNum
        ] as HTMLElement;

        elem.focus();
      } else if (active === Active.TABS) {
        //
        if (tabFocusNum.current.value() === 0) {
          closeAllTabsAccordions();
          return;
        }

        openAllTabsAccordions();

        const prevNum = tabFocusNum.current.prev().value;
        const elem = document.querySelectorAll(historyItemSelector)[
          prevNum
        ] as HTMLElement;

        elem.focus();
      }
    },
    [active]
  );

  // TODO: Fix directly using DOM
  useHotkeys(
    "down",
    (ev) => {
      ev.preventDefault();

      if (
        active === Active.HISTORY &&
        historyFocusNum.current.value() < history.items.length - 1
      ) {
        const nextNum = historyFocusNum.current.next().value;
        const elem = document.querySelectorAll(historyItemSelector)[
          nextNum
        ] as HTMLElement;

        elem.focus();
      } else if (active === Active.TABS) {
        openAllTabsAccordions();

        const historyItems = document.querySelectorAll(historyItemSelector);

        // Check if next value exists in DOM
        if (!historyItems[tabFocusNum.current.value() + 1]) return;

        const nextNum = tabFocusNum.current.next().value;
        const elem = historyItems[nextNum] as HTMLElement;

        elem.focus();
      }
    },
    [active, history.items]
  );

  useHotkeys(
    "enter",
    (ev) => {
      ev.preventDefault();

      const currentHistoryFocusNum = historyFocusNum.current.value();
      const currentTabFocusNum = tabFocusNum.current.value();

      if (active === Active.HISTORY && currentHistoryFocusNum >= 0) {
        (document.activeElement as HTMLElement).click();
      } else if (active === Active.TABS && currentTabFocusNum >= 0) {
        (document.activeElement as HTMLElement).click();
      }
    },
    [active]
  );

  useHotkeys("backspace,delete", (ev) => {
    ev.preventDefault();

    const currentValue = historyFocusNum.current.value();
    const url = history.items[currentValue].url;

    if (active === Active.HISTORY && currentValue > 0 && url) {
      dispatch(deleteItem(url));
    }
  });

  return parentRef;
};

export default useKeyboardShortcuts;
