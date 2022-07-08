import { Avatar, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import styled from "@emotion/styled";

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 32px;
  width: 32px;
`;

const StyledAvatar = styled(Avatar)`
  height: 16px;
  width: 16px;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
`;

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap;

  p {
    width: calc(100% - 0.3rem);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiListItemText-secondary {
    width: calc(100% - 8ch);
  }
`;

export { StyledAvatar, StyledListItem, StyledListItemText, StyledListItemIcon };
