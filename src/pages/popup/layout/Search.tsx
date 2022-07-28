import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { lighten, InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { RootState, useAppDispatch } from "../redux/store";
import { getHistory } from "../redux/history/thunks";
import { setSearchOpened, Active } from "../redux/ui/ui-slice";
import { filter } from "../redux/tabs/tabs-slice";
import { getDevices, getRecentlyClosed } from "../redux/tabs/thunks";

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.light,
}));

const StyledInputBase = styled(InputBase)<{
  open: boolean;
  accentFontColor: string;
}>(({ theme, open, accentFontColor }) => ({
  transition: "all 0.3s ease-out",
  trasformOrigin: "left",
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
    backgroundColor: "rgba(255,255,255, 0.35)",
    color: "#f5f5f5",

    "&::placeholder": {
      color: lighten(accentFontColor, 0.9),
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
        onKeyUp={async (ev) => {
          const target = ev.target as HTMLInputElement;

          if (UI.active === Active.HISTORY) {
            // Update history
            await dispatch(getHistory({ text: target.value }));
            return;
          } else if (UI.active === Active.TABS) {
            // ! BUG: Fix state not properly updating because of Immer in tabSlice. Other Tabs filtering also needs work.
            // Refresh data (because filtering removed the data from tabSlice state)
            dispatch(getRecentlyClosed());
            dispatch(getDevices());

            // Update Tabs
            dispatch(filter(target.value));
          }
        }}
        onBlur={() => dispatch(setSearchOpened(false))}
      />
    </div>
  );
};

export default Search;
