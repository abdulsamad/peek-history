import React from "react";
import Hotkeys from "react-hot-keys";
import { useSelector } from "react-redux";

import {
  Active,
  setSearchOpened,
  switchActiveView,
} from "../redux/ui/ui-slice";
import { RootState } from "../redux/store";
import { ISettings } from "@src/commons/redux/settings/defaults";
import { useAppDispatch } from "@src/pages/options/redux/store";
import { onURLClick } from "./utils";

const KeyboardShortcuts = ({
  active,
  settings,
}: {
  active: Active;
  settings: ISettings;
}) => {
  const history = useSelector((state: RootState) => state.history);
  const tabs = useSelector((state: RootState) => state.tabs);
  const dispatch = useAppDispatch();

  const shortcutsFragment = () => {
    const elememtsCollection = [];
    const shortcutLastDigit = 9;

    for (let index = 0; index < shortcutLastDigit; index++) {
      elememtsCollection.push(
        <Hotkeys
          keyName={`alt+${index + 1}`}
          onKeyDown={(shortcut, ev) => {
            ev.preventDefault();

            if (active === Active.HISTORY) {
              onURLClick(history.items[index].url as string, settings.openURL);
              return;
            } else if (active === Active.TABS) {
              // Whether selected item is window
              tabs.recent[index].window
                ? onURLClick(
                    tabs.recent[index].window?.tabs[0].url,
                    settings.openURL
                  )
                : onURLClick(tabs.recent[index].tab.url, settings.openURL);
            }
          }}
          allowRepeat
        />
      );
    }

    return elememtsCollection;
  };

  return (
    <>
      {/* Open search */}
      <Hotkeys
        keyName="alt+s"
        onKeyDown={(shortcut, ev) => {
          ev.preventDefault();
          dispatch(setSearchOpened(true));
        }}
        allowRepeat
      />
      {/* Open History/extension home view */}
      <Hotkeys
        keyName="alt+h"
        onKeyDown={(shortcut, ev) => {
          ev.preventDefault();
          dispatch(switchActiveView(Active.HISTORY));
        }}
        allowRepeat
      />
      {/* Open Tab view */}
      <Hotkeys
        keyName="alt+t"
        onKeyDown={(shortcut, ev) => {
          ev.preventDefault();
          dispatch(switchActiveView(Active.TABS));
        }}
        allowRepeat
      />
      {/* Open extension settings page */}
      <Hotkeys
        keyName="alt+o"
        onKeyDown={(shortcut, ev) => {
          ev.preventDefault();
          chrome.runtime.openOptionsPage();
        }}
        allowRepeat
      />
      {shortcutsFragment()}
    </>
  );
};

export default KeyboardShortcuts;
