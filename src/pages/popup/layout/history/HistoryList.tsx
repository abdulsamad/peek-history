import React from "react";
import { List } from "@mui/material";
import { useSelector } from "react-redux";

import { ISettings } from "@src/commons/redux/settings/defaults";
import HistoryItem from "../utils/ListItem";
import { deleteItem } from "../../redux/history/thunks";
import { RootState, useAppDispatach } from "../../redux/store";
import Preloader from "./Preloader";
import NotFound from "../utils/NotFound";

const HistoryList = ({ settings }: { settings: ISettings }) => {
  const history = useSelector((state: RootState) => state.history);
  const UI = useSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatach();

  const onClick = async (url: string) => {
    // Open link in new tab
    if (settings.openURL === "new-tab") {
      await chrome.tabs.create({ url });
      return;
    } else if (settings.openURL === "background-tab") {
      await chrome.tabs.create({ url, active: false });
      return;
    }

    // Open link in current tab
    await chrome.tabs.update({ url });
  };

  if (history.loading) {
    return <Preloader hideURL={false} />;
  }

  // User search for history item
  if (UI.searchOpened && history.items.length < 1) return <NotFound search />;

  // User does not have history
  if (history.items.length < 1) return <NotFound />;

  return (
    <List sx={{ padding: 0 }} aria-label="History Items">
      {history.items.map(({ id, title, url, lastVisitTime }) => (
        <HistoryItem
          key={id}
          title={title}
          url={url}
          lastVisitTime={lastVisitTime}
          hideURL={settings.hideURL}
          hideTime={settings.hideTime}
          onClick={() => {
            if (!url) throw new Error("URL not found!");

            onClick(url);
          }}
          onItemDelete={() => {
            if (!url) throw new Error("URL not found!");

            dispatch(deleteItem(url));
          }}
          showSecondary
        />
      ))}
    </List>
  );
};

export default HistoryList;
