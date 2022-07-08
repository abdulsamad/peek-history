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
import TimeAgo from "timeago-react";
import styled from "@emotion/styled";

const StyledAvatar = styled(Avatar)`
  height: 16px;
  width: 16px;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
`;

interface IHistoryItem {
  title: string;
  url: URL;
  lastVisitTime: number;
  hideURL: boolean;
}

const HistoryItem = ({ title, url, lastVisitTime, hideURL }: IHistoryItem) => {
  return (
    <StyledListItem divider={true}>
      <ListItemIcon>
        <StyledAvatar
          // src={`chrome://favicon/${url.href}`}
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
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          {/* <DeleteModal url={url} /> */}
        </IconButton>
        <Typography variant="caption" display="block" noWrap>
          {/* {ConvertTimeAgo(lastVisitTime)} */}
          <TimeAgo datetime={lastVisitTime} />
        </Typography>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default HistoryItem;
