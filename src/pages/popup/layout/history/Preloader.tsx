import React, { ReactElement } from "react";
import {
  List,
  ListItemSecondaryAction,
  IconButton,
  Skeleton,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
} from "../utils/ListItem/Styles";

interface IPreloader {
  hideURL: boolean;
}

const content: ReactElement[] = [];

const Preloader = ({ hideURL }: IPreloader) => {
  // Push history item to the array and create a copy of history items for skeleton loading
  for (let i = 0; i < 10; i++) {
    content.push(
      <StyledListItem key={i} divider={true}>
        <StyledListItemIcon>
          <Skeleton variant="circular" width={20} height={20} />
        </StyledListItemIcon>
        <StyledListItemText
          primary={<Skeleton sx={{ width: "calc(100% - 1.2rem)" }} />}
          secondary={!hideURL && <Skeleton />}
        />
        <ListItemSecondaryAction sx={{ textAlign: "right" }}>
          <IconButton edge="end">
            <Skeleton variant="circular" width={20} height={20} />
          </IconButton>
          <Skeleton width={47} />
        </ListItemSecondaryAction>
      </StyledListItem>
    );
  }

  return (
    <List>
      <div>{content}</div>
    </List>
  );
};

export default Preloader;
