import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";

import { ISettings } from "@src/commons/redux/settings/defaults";
import { useAppDispatch } from "@src/pages/options/redux/store";
import HistoryList from "./history/HistoryList";
import TabsList from "./tabs/TabsList";
import { RootState } from "../redux/store";
import { Active, setShowUpdatePopup } from "../redux/ui/ui-slice";
import KeyboardShortcuts from "./KeyboardShortcuts";

const ContentContainer = styled("div")(() => ({
  height: "calc(100% - 56px)",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
}));

const Content = ({ settings }: { settings: ISettings }) => {
  const UIState = useSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch();

  useEffect(() => {
    chrome.runtime.onInstalled.addListener(({ reason }) => {
      const currentVersion = chrome.runtime.getManifest().version;

      switch (reason) {
        case "install":
          console.log(
            `New user has installed the extension and version is ${currentVersion}`
          );
          break;
        case "update":
          dispatch(setShowUpdatePopup(true));
          console.log(`User has updated their extension to ${currentVersion}`);
          break;
      }
    });
  }, []);

  return (
    <ContentContainer>
      {UIState.active === Active.HISTORY && <HistoryList settings={settings} />}
      {UIState.active === Active.TABS && <TabsList settings={settings} />}
      <KeyboardShortcuts active={UIState.active} settings={settings} />
    </ContentContainer>
  );
};

export default Content;
