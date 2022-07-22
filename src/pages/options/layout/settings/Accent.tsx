import React from "react";
import { styled } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { accents } from "../../redux/settings/defaults";
import { useAppDispatach } from "../../redux/store";
import { setAccent } from "../../redux/settings/settings-slice";

const Button = styled("button")<{ active?: boolean }>(({ active }) => ({
  height: 30,
  width: 30,
  border: "none",
  borderRadius: "50%",
  position: "relative",
  cursor: "pointer",

  "&::after": {
    content: '"\\2714"',
    fontSize: 15,
    height: 30,
    width: 30,
    color: "#000",
    position: "absolute",
    top: 0,
    left: 0,
    display: active ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "50%",
  },

  "&:focus": {
    outline: "none",
  },
}));

const ButtonGroup = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const RoundedInput = styled("input")(() => ({
  height: 30,
  width: 30,
  border: "none",
  borderRadius: 5,
  backgroundColor: "#C7C7C7",

  "&.active::after": {
    outline: "1px solid currentColor",
  },
}));

const Accent = ({ value }: { value: string }) => {
  const dispatch = useAppDispatach();

  return (
    <SettingItem label="Accent">
      <ButtonGroup>
        {accents.map(({ color }) => (
          <Button
            key={color}
            onClick={() => dispatch(setAccent(color))}
            style={{ backgroundColor: color }}
            aria-label={`${color} color`}
            active={color === value}
          />
        ))}
        <RoundedInput
          type="color"
          value={value}
          // TODO: Add debounce to improve performance
          onChange={(ev) => dispatch(setAccent(ev.target.value))}
        />
      </ButtonGroup>
    </SettingItem>
  );
};

export default Accent;
