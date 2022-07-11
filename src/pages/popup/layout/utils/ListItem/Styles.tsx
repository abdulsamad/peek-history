import { Avatar, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material";

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 32px;
  width: 32px;
`;

const StyledAvatar = styled(Avatar)`
  height: 16px;
  width: 16px;
`;

const StyledListItem = styled(ListItem)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 5px solid ${theme.palette.primary.main};
  }
`
);

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap;

  p {
    width: calc(100% - 1.2rem);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiListItemText-secondary {
    width: calc(100% - 11.5ch);
  }
`;

export { StyledAvatar, StyledListItem, StyledListItemText, StyledListItemIcon };
