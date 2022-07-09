import React, { useState, useRef } from "react";
import { InputBase, Theme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

import { useAppDispatach } from "../redux/store";
import { getHistory } from "../redux/history/thunks";

const StyledSearchIcon = styled(SearchIcon)`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
`;

const StyledInputBase = styled(InputBase)(
  ({ open }: { open: boolean }) => `
  transition: all 0.3s ease-out;
  trasform-origin: left;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${open ? "100%" : 0};
  padding: 8px 1rem;
  z-index: ${open ? 10 : -1};
  background-color: white;
`
);

const Search = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatach();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <StyledSearchIcon
        onClick={() => {
          setOpen((prevState) => !prevState);
          inputRef.current?.focus();
        }}
      />
      <StyledInputBase
        placeholder="Search History…"
        inputProps={{ "aria-label": "search history" }}
        inputRef={inputRef}
        style={{ width: open ? "100%" : 0 }}
        onKeyUp={(ev) => {
          // Update history
          const target = ev.target as HTMLInputElement;
          dispatch(getHistory({ text: target.value }));

          if (ev.key.toLowerCase() === "escape") setOpen(false);
        }}
        onBlur={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default Search;
