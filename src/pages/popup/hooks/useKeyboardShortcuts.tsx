import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { ISettings } from "@src/commons/redux/settings/defaults";
import { useAppDispatch } from "@src/pages/options/redux/store";
import {
  Active,
  setSearchOpened,
  switchActiveView,
} from "../redux/ui/ui-slice";
import { numberIterator } from "./utils";
import { deleteItem } from "../redux/history/thunks";
import { RootState } from "../redux/store";
import { onURLClick } from "../hooks/utils";

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
  const historyItemSelector = '[data-history-item="true"]';

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

  useHotkeys("up", (ev) => {
    ev.preventDefault();

    if (active === Active.HISTORY && historyFocusNum.current.value() > 0) {
      const prevNum = historyFocusNum.current.prev().value;
      const elem = document.querySelectorAll(historyItemSelector)[
        prevNum
      ] as HTMLElement;

      elem.focus();
    } else if (active === Active.TABS) {
      const prevNum = tabFocusNum.current.prev().value;
      //
    }
  });

  useHotkeys("down", (ev) => {
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
      const nextNum = tabFocusNum.current.next().value;
      //
    }
  });

  useHotkeys("enter", (ev) => {
    ev.preventDefault();

    const currentValue = historyFocusNum.current.value();

    if (active === Active.HISTORY && currentValue >= 0) {
      const url = history.items[currentValue].url;

      if (url) onURLClick(url, settings.openURL);
    } else if (active === Active.TABS) {
      //
    }
  });

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