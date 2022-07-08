import React from "react";
import { Typography, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import TimeAgo from "timeago-react";

import {
  StyledAvatar,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
} from "./Styles";

interface IHistoryItem {
  title: string;
  url: URL;
  lastVisitTime: number;
  hideURL: boolean;
}

const HistoryItem = ({ title, url, lastVisitTime, hideURL }: IHistoryItem) => {
  return (
    <StyledListItem divider={true}>
      <StyledListItemIcon>
        <StyledAvatar
          // src={`chrome://favicon/${url.href}`}
          alt={`${url.hostname} Favicon`}
        />
      </StyledListItemIcon>
      <StyledListItemText
        primary={
          title ? (
            <Typography title={title} variant="body1" display="block">
              {title}
            </Typography>
          ) : (
            <Typography variant="body1" color="error" display="block">
              (Title Not Available)
            </Typography>
          )
        }
        primaryTypographyProps={{ title }}
        secondary={!hideURL && url.href}
        secondaryTypographyProps={{ title: url.href }}
      />
      <ListItemSecondaryAction sx={{ textAlign: "right" }}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon fontSize="small" />
          {/* <DeleteModal url={url} /> */}
        </IconButton>
        <Typography variant="caption" display="block" noWrap>
          <TimeAgo datetime={lastVisitTime} />
        </Typography>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default HistoryItem;
