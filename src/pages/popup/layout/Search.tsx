import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { RootState, useAppDispatach } from "../redux/store";
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

const StyledInputBase = styled(InputBase)<{ open: boolean }>(
  ({ theme, open }) => ({
    transition: "all 0.3s ease-out",
    trasformOrigin: "left",
    background: "transparent",
    cursor: "pointer",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    height: 60,
    width: open ? "100%" : 0,
    padding: "8px 1rem",
    zIndex: open ? 10 : -1,
    backgroundColor: theme.palette.background.default,
  })
);

const Search = () => {
  const UI = useSelector((state: RootState) => state.ui);
  const dispatch = useAppDispatach();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <StyledSearchIcon
        onClick={() => {
          dispatch(setSearchOpened(!UI.searchOpened));
          inputRef.current?.focus();
        }}
      />
      <StyledInputBase
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
          }

          // ! BUG: Fix state not properly updating because of Immer in tabSlice. Other Tabs filtering also needs work.
          // Refresh data (because filtering removed the data from tabSlice state)
          dispatch(getRecentlyClosed());
          dispatch(getDevices());

          // Update Tabs
          dispatch(filter(target.value));
        }}
        onBlur={() => dispatch(setSearchOpened(false))}
        open={UI.searchOpened}
      />
    </div>
  );
};

export default Search;
