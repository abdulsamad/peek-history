import React from "react";
import { Menu, MenuItem, ButtonBase } from "@mui/material";
import { DeleteForever as DeleteForeverIcon } from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";

const DeleteMultiple = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        sx={{ height: "100%", width: "100%", padding: "14px 12px 0 12px" }}
        onClick={handleClick}
      >
        <DeleteForeverIcon
          aria-controls={open ? "delete-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        />
      </ButtonBase>
      <Menu
        aria-labelledby="delete-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem>Last 30 Mins</MenuItem>
        <MenuItem>Last 1 Hour</MenuItem>
        <MenuItem>Last 24 Hours</MenuItem>
        <MenuItem>
          <ConfirmationModal
            text="Delete All"
            question="Clear History?"
            warning={
              <>
                <strong>Note:</strong> This will delete all your browsing
                history.
              </>
            }
            onConfirm={() => console.log("hello")}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DeleteMultiple;
