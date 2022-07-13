import React, { useState } from "react";
import { styled } from "@mui/material";

import SettingItem from "../utils/SettingItem";

const accents = [
  { color: "#64B5F6", active: false },
  { color: "#E57373", active: false },
  { color: "#4db6ac", active: false },
  { color: "#4dd0e1", active: false },
  { color: "#ffd54f", active: false },
  { color: "#f06292", active: false },
];

const Button = styled("button")(() => ({
  height: 30,
  width: 30,
  border: "none",
  borderRadius: "50%",
  position: "relative",
  cursor: "pointer",

  "&.active::after": {
    content: '"\\2714"',
    fontSize: 15,
    height: 30,
    width: 30,
    color: "#000",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
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

const Accent = () => {
  const [color, setColor] = useState("");

  return (
    <SettingItem label="Accent">
      <ButtonGroup>
        {accents.map(({ color, active }) => (
          <Button
            key={color}
            onClick={() => null}
            style={{ backgroundColor: color }}
            aria-label={`${color} color`}
          />
        ))}
        <RoundedInput type="color" value={color} onChange={(ev) => null} />
      </ButtonGroup>
    </SettingItem>
  );
};

export default Accent;
