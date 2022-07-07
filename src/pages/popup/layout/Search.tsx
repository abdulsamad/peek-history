import React from "react";
import { InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const Search = () => {
  return (
    <div>
      <div>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search History…"
        // onKeyUp={(ev) => search(ev.target.value)}
        inputProps={{ "aria-label": "search", className: "search" }}
      />
    </div>
  );
};

export default Search;
