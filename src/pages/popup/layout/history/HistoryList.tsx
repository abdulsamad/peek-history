import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Skeleton,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";

import HistoryItem from "./HistoryItem";
import { RootState } from "../../redux/store";

const HistoryList = () => {
  const history = useSelector((state: RootState) => state.history);

  return (
    <List>
      {history.map(({ title, url, lastVisitTime }) => (
        <HistoryItem
          key={url}
          title={title}
          url={new URL(url)}
          lastVisitTime={lastVisitTime}
          hideURL={false}
        />
      ))}
    </List>
  );
};

export default HistoryList;
