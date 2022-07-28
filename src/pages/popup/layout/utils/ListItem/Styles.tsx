import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  darken,
} from "@mui/material";
import { styled } from "@mui/material";

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 32px;
  width: 32px;
`;

const StyledAvatar = styled(Avatar)(() => ({
  height: 16,
  width: 16,
}));

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
  
  &:focus {
    outline: none;
    background-color: ${darken(theme.palette.text.primary, 0.9)};
    border-left: 5px solid ${theme.palette.primary.main};  
  }
`
);

const StyledListItemText = styled(ListItemText)<{
  showSecondary: boolean | undefined;
}>(({ showSecondary }) => ({
  whiteSpace: "nowrap",

  "& p": {
    width: showSecondary ? "calc(100% - 1.2rem)" : "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& .MuiListItemText-secondary": {
    width: showSecondary ? "calc(100% - 11ch)" : "100%",
  },
}));

export { StyledAvatar, StyledListItem, StyledListItemText, StyledListItemIcon };
