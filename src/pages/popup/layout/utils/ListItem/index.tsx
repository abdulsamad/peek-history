import React, { MouseEventHandler } from "react";
import { Typography, ListItemSecondaryAction } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import TimeAgo from "timeago-react";

import ConfirmationModal from "../ConfirmationModal";
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
  onClick: MouseEventHandler<HTMLLIElement>;
  showSecondary?: boolean;
  onItemDelete?: () => void;
}

const HistoryItem = ({
  title,
  url,
  lastVisitTime,
  hideURL,
  onClick,
  showSecondary,
  onItemDelete,
}: IHistoryItem) => {
  return (
    <StyledListItem divider={true} onClick={onClick}>
      <StyledListItemIcon>
        <StyledAvatar
          // TODO: Add new favicon API when chrome adds it
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
      {showSecondary && onItemDelete && (
        <ListItemSecondaryAction sx={{ textAlign: "right" }}>
          <ConfirmationModal
            icon={<DeleteIcon fontSize="small" />}
            iconButtonProps={{ edge: "end", "aria-label": "delete" }}
            question="Delete History Item?"
            warning={
              <>
                <strong>Note:</strong> Deleting this also deletes this from your
                browser history.
              </>
            }
            onConfirm={onItemDelete}
          />
          <Typography variant="caption" display="block" noWrap>
            <TimeAgo datetime={lastVisitTime} />
          </Typography>
        </ListItemSecondaryAction>
      )}
    </StyledListItem>
  );
};

export default HistoryItem;
