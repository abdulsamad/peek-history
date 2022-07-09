import React from "react";
import { List } from "@mui/material";
import { useSelector } from "react-redux";

import HistoryItem from "../utils/ListItem";
import { deleteItem } from "../../redux/history/history-slice";
import { RootState, useAppDispatach } from "../../redux/store";
import Preloader from "./Preloader";

const HistoryList = () => {
  const history = useSelector((state: RootState) => state.history);
  const dispatch = useAppDispatach();

  if (history.loading) {
    return <Preloader hideURL={false} />;
  }

  return (
    <List>
      {history.items.map(({ id, title, url, lastVisitTime }) => (
        <HistoryItem
          key={id}
          title={title}
          url={new URL(url)}
          lastVisitTime={lastVisitTime}
          hideURL={false}
          showSecondary
          onClick={async () => {
            // await chrome.tabs.update({ url });
            await chrome.tabs.create({ url });
          }}
          onItemDelete={() => {
            dispatch(deleteItem(url));
          }}
        />
      ))}
    </List>
  );
};

export default HistoryList;
