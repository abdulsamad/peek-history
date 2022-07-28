import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";

import useKeyboardShortcuts from "@src/pages/popup/hooks/useKeyboardShortcuts";
import { ISettings } from "@src/commons/redux/settings/defaults";
import { useAppDispatch } from "@src/pages/options/redux/store";
import HistoryList from "./history/HistoryList";
import TabsList from "./tabs/TabsList";
import { RootState } from "../redux/store";
import { Active, setShowUpdatePopup } from "../redux/ui/ui-slice";

const ContentContainer = styled("div")(() => ({
  height: "calc(100% - 56px)",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
}));

const Content = ({ settings }: { settings: ISettings }) => {
  // Slices
  const history = useSelector((state: RootState) => state.history);
  const tabs = useSelector((state: RootState) => state.tabs);
  const UIState = useSelector((state: RootState) => state.ui);

  // Dispatch
  const dispatch = useAppDispatch();

  // Keyboard Navigation
  useKeyboardShortcuts({
    active: UIState.active,
    settings,
    tabs,
    history,
  });

  useEffect(() => {
    chrome.runtime.onInstalled.addListener(({ reason }) => {
      const currentVersion = chrome.runtime.getManifest().version;

      switch (reason) {
        case "install":
          // eslint-disable-next-line no-console
          console.log(
            `New user has installed the extension and version is ${currentVersion}`
          );
          break;
        case "update":
          dispatch(setShowUpdatePopup(true));
          // eslint-disable-next-line no-console
          console.log(`User has updated their extension to ${currentVersion}`);
          break;
      }
    });
  }, []);

  return (
    <ContentContainer>
      {UIState.active === Active.HISTORY && (
        <HistoryList history={history} settings={settings} />
      )}
      {UIState.active === Active.TABS && (
        <TabsList tabs={tabs} settings={settings} />
      )}
    </ContentContainer>
  );
};

export default Content;
