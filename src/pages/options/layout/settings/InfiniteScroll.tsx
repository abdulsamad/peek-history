import React from "react";
import { Switch } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { useAppDispatach } from "../../redux/store";
import { setInfinite } from "../../../../commons/redux/settings/settings-slice";

const InfiniteScroll = ({ value }: { value: boolean }) => {
  const dispatch = useAppDispatach();

  return (
    <SettingItem label="Infinite Scroll">
      <Switch
        checked={value}
        onChange={(ev) => dispatch(setInfinite(ev.target.checked))}
        color="primary"
        inputProps={{ "aria-label": "infiniteScroll" }}
      />
    </SettingItem>
  );
};

export default InfiniteScroll;
