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

import HistoryItem from "../utils/ListItem";
import { RootState } from "../../redux/store";

const HistoryList = () => {
  const history = useSelector((state: RootState) => state.history);

  return (
    <List>
      {history.items.map(({ id, title, url, lastVisitTime }) => (
        <HistoryItem
          key={id}
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
