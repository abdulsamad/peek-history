import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  Active,
  setSearchOpened,
  switchActiveView,
} from "../redux/ui/ui-slice";
import { closeAllTabsAccordions, openAllTabsAccordions } from "./utils";
import { restoreSession } from "../redux/tabs/thunks";
import { RootState, useAppDispatch } from "../redux/store";

// History/Tab Item selector
export const historyItemSelector = '[data-history-item="true"]';
export const tabsAccordionSelector = '[data-tabs-accordion="true"]';
export const windowItemSelector = '[data-window-item="true"]';

// History/Tab items in the order they are displayed
const listItems = () =>
  Array.from(document.querySelectorAll<HTMLElement>(historyItemSelector));

// Menus and dialogs handle their own arrow keys
const isInOverlay = (ev: KeyboardEvent) =>
  (ev.target as Element | null)?.closest?.('[role="menu"], [role="dialog"]') !=
  null;

const useKeyboardShortcuts = ({
  active,
  tabs,
}: {
  active: Active;
  tabs: RootState["tabs"];
}) => {
  const dispatch = useAppDispatch();

  const parentRef = useRef();

  // Open search
  useHotkeys("alt+s, ctrl+s", (ev) => {
    ev.preventDefault();

    dispatch(setSearchOpened(true));
  });

  // Open History/extension home view
  useHotkeys("alt+h, ctrl+h", (ev) => {
    ev.preventDefault();

    dispatch(switchActiveView(Active.HISTORY));
  });

  // Open Tab view
  useHotkeys("alt+t, ctrl+t", (ev) => {
    ev.preventDefault();

    dispatch(switchActiveView(Active.TABS));
  });

  // Open extension settings page
  useHotkeys("alt+o, ctrl+o", (ev) => {
    ev.preventDefault();

    chrome.runtime.openOptionsPage();
  });

  // Open nth number history/tab link
  for (let index = 0; index < 9; index++) {
    useHotkeys(`alt+${index + 1}, ctrl+${index + 1}`, (ev) => {
      ev.preventDefault();

      if (active === Active.HISTORY) {
        // Same as clicking the nth displayed row, which follows the sort setting
        listItems()[index]?.click();
      } else if (active === Active.TABS) {
        // Restore the nth recently closed tab or window
        const session = tabs.recent[index];
        const sessionId = session?.window?.sessionId ?? session?.tab?.sessionId;

        if (sessionId) dispatch(restoreSession(sessionId));
      }
    });
  }

  // TODO: Fix directly using DOM
  useHotkeys(
    "up",
    (ev) => {
      if (isInOverlay(ev)) return;
      ev.preventDefault();

      const items = listItems();
      const current = items.indexOf(document.activeElement as HTMLElement);

      if (active === Active.TABS && current === 0) {
        closeAllTabsAccordions();
        return;
      }

      if (current > 0) items[current - 1].focus();
    },
    [active]
  );

  // TODO: Fix directly using DOM
  useHotkeys(
    "down",
    (ev) => {
      if (isInOverlay(ev)) return;
      ev.preventDefault();

      if (active === Active.TABS) openAllTabsAccordions();

      const items = listItems();
      const current = items.indexOf(document.activeElement as HTMLElement);

      items[current + 1]?.focus();
    },
    [active]
  );

  useHotkeys("enter", (ev) => {
    const focused = document.activeElement as HTMLElement | null;

    // Buttons, menus and dialogs handle Enter themselves
    if (!focused?.matches(historyItemSelector)) return;

    ev.preventDefault();
    focused.click();
  });

  return parentRef;
};

export default useKeyboardShortcuts;
