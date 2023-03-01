import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  darken,
  lighten,
} from "@mui/material";
import { styled } from "@mui/material";

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 32px;
  width: 32px;
`;

const StyledAvatar = styled(Avatar)(() => ({
  height: 20,
  width: 20,
}));

const StyledListItem = styled(ListItem)<{ hideURL?: boolean }>(
  ({ theme, hideURL }) => `
  display: flex;
  align-items: center;
  padding: ${hideURL ? "14px 16px" : "8px 16px"};
  cursor: pointer;

  &:hover {
    background: rgba( 255, 255, 255, 0.25 );
    background-color: ${
      theme.palette.mode === "dark"
        ? darken(theme.palette.text.primary, 0.6)
        : lighten(theme.palette.text.primary, 0.9)
    };
    box-shadow: 0 3px 5px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 14px );
    border-left: 5px solid ${theme.palette.primary.main};
  }
  
  &:focus {
    outline: none;
    background-color: ${
      theme.palette.mode === "dark"
        ? darken(theme.palette.text.primary, 0.6)
        : lighten(theme.palette.text.primary, 0.9)
    };
    box-shadow: 0 3px 5px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 14px );
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
