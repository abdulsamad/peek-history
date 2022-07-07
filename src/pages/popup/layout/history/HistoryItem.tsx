import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Link,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";

interface IHistoryItem {
  title: string;
  url: URL;
  lastVisitTime: number;
  hideURL: boolean;
}

const HistoryItem = ({ title, url, lastVisitTime, hideURL }: IHistoryItem) => {
  return (
    <ListItem divider={true}>
      <Link
        color="inherit"
        href={url.href}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <ListItemIcon>
          <Avatar
            src={`chrome://favicon/${url.href}`}
            alt={`${url.hostname} Favicon`}
          />
        </ListItemIcon>
        <ListItemText
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
      </Link>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          {/* <DeleteModal url={url} /> */}
        </IconButton>
        <Typography variant="caption" display="block" noWrap>
          {/* {ConvertTimeAgo(lastVisitTime)} */}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default HistoryItem;
