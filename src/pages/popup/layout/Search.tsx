import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { lighten, InputBase, styled, darken } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { RootState, useAppDispatch } from "../redux/store";
import { getHistory } from "../redux/history/thunks";
import { setSearchOpened, Active } from "../redux/ui/ui-slice";
import { filter } from "../redux/tabs/thunks";
import { historyItemSelector } from "../hooks/useKeyboardShortcuts";
import { openAllTabsAccordions } from "../hooks/utils";

const StyledSearchIcon = styled(SearchIcon)({
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Same color as the navbar title (accent font color)
  color: "inherit",
});

const StyledInputBase = styled(InputBase)<{
  open: boolean;
  accentFontColor: string;
}>(({ theme, open, accentFontColor }) => ({
  transition: "all 0.3s ease-out",
  transformOrigin: "left",
  background: theme.palette.primary.main,
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  height: 60,
  width: open ? "100%" : 0,
  padding: "8px 1rem",
  zIndex: open ? 10 : -1,

  input: {
    padding: "0.5rem",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, 0.25)",
    color: "#f5f5f5",

    "&::placeholder": {
      color: lighten(accentFontColor, 0.3),
    },

    "&::selection": {
      backgroundColor: darken(accentFontColor, 1),
    },
  },
}));

const Search = () => {
  const UI = useSelector((state: RootState) => state.ui);
  const accentFontColor = useSelector(
    (state: RootState) => state.settings.accentFont
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (UI.searchOpened) {
      inputRef.current?.focus();
    }
  }, [UI.searchOpened]);

  const search = (text: string) => {
    if (UI.active === Active.HISTORY) {
      // Update history
      dispatch(getHistory({ text }));
    } else if (UI.active === Active.TABS) {
      // Update Tabs
      dispatch(filter(text));
    }
  };

  // Apply the current search to the view that was switched to
  useEffect(() => {
    const text = inputRef.current?.value;

    if (text) search(text);
  }, [UI.active]);

  return (
    <div>
      <StyledSearchIcon
        onClick={() => dispatch(setSearchOpened(!UI.searchOpened))}
      />
      <StyledInputBase
        open={UI.searchOpened}
        accentFontColor={accentFontColor}
        placeholder="Enter search keyword or URL"
        inputProps={{ "aria-label": "search history" }}
        inputRef={inputRef}
        style={{ width: UI.searchOpened ? "100%" : 0 }}
        onChange={(ev) => {
          // Show the matching tabs inside their sections
          if (UI.active === Active.TABS) openAllTabsAccordions();

          search(ev.target.value);
        }}
        onKeyUp={(ev) => {
          // Accessibility
          if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
            document.querySelector<HTMLElement>(historyItemSelector)?.focus();
          }
        }}
        onBlur={(ev) => {
          if (ev.target.value === "") dispatch(setSearchOpened(false));
        }}
      />
    </div>
  );
};

export default Search;
