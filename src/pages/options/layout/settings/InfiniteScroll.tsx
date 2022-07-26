import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatch } from "../../redux/store";
import { setInfinite } from "../../../../commons/redux/settings/settings-slice";

const InfiniteScroll = ({
  value,
  disabled,
}: {
  value: boolean;
  disabled: boolean;
}) => {
  const dispatch = useAppDispatch();

  return (
    <SettingItem
      label="Infinite Scroll"
      info='Will not work if the sorting of history is set to most visit ("By Most Visit" above).'
    >
      <Switch
        checked={value}
        onChange={(ev) => dispatch(setInfinite(ev.target.checked))}
        color="primary"
        inputProps={{ "aria-label": "infiniteScroll" }}
        disabled={disabled}
      />
    </SettingItem>
  );
};

export default InfiniteScroll;
