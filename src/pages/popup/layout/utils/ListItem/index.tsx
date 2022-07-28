import React, { MouseEventHandler } from "react";
import { Typography, ListItemSecondaryAction } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import TimeAgo from "timeago-react";

import ConfirmationModal from "../ConfirmationModal";
import { IHistoryItem } from "../../../redux/history/history-slice";
import {
  StyledAvatar,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
} from "./Styles";

// Filter id field from historyItem because we don't want it as prop
type IFilteredHistoryItem = Omit<IHistoryItem, "id">;

/**
 * This can be used for History Item as well as Tab Item
 */

interface INewHistoryItem extends IFilteredHistoryItem {
  hideURL: boolean;
  hideTime: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
  showSecondary?: boolean;
  onItemDelete?: () => void;
}

const HistoryItem = ({
  title,
  url,
  lastVisitTime,
  hideURL,
  hideTime,
  onClick,
  showSecondary,
  onItemDelete,
}: INewHistoryItem) => {
  return (
    <StyledListItem
      divider={true}
      onClick={onClick}
      tabIndex={-1}
      data-history-item
    >
      <StyledListItemIcon>
        <StyledAvatar
          // TODO: Add new favicon API when chrome adds it
          // src={`chrome://favicon/${url.href}`}
          alt={`${url} Favicon`}
        />
      </StyledListItemIcon>
      <StyledListItemText
        showSecondary={showSecondary}
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
        secondary={!hideURL && url}
        secondaryTypographyProps={{ title: url }}
      />
      {showSecondary && onItemDelete && (
        <ListItemSecondaryAction sx={{ textAlign: "right" }}>
          <ConfirmationModal
            icon={<DeleteIcon fontSize="small" />}
            ButtonProps={{ edge: "end", "aria-label": "delete" }}
            question="Delete History Item?"
            warning={
              <>
                <strong>Note:</strong> Deleting this also deletes this from your
                browser history.
              </>
            }
            onConfirm={onItemDelete}
          />
          {!hideTime && lastVisitTime && (
            <Typography variant="caption" display="block" noWrap>
              <TimeAgo datetime={lastVisitTime} />
            </Typography>
          )}
        </ListItemSecondaryAction>
      )}
    </StyledListItem>
  );
};

export default HistoryItem;
