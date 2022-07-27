import React, { useCallback } from "react";
import { debounce, styled } from "@mui/material";

import SettingItem from "../utils/SettingItem";
import { accents } from "../../../../commons/redux/settings/defaults";
import { useAppDispatch } from "../../redux/store";
import { setAccent } from "../../../../commons/redux/settings/settings-slice";

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

const CustomColorInput = styled("input")(() => ({
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
  const dispatch = useAppDispatch();

  const debouncedSetAccent = useCallback(
    debounce((color: string) => dispatch(setAccent(color)), 200),
    []
  );

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
        <CustomColorInput
          type="color"
          value={value}
          onChange={(ev) => debouncedSetAccent(ev.target.value)}
        />
      </ButtonGroup>
    </SettingItem>
  );
};

export default Accent;
