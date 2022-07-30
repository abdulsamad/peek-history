import React from "react";
import { Menu, MenuItem, ButtonBase } from "@mui/material";
import { DeleteForever as DeleteForeverIcon } from "@mui/icons-material";
import dayjs from "dayjs";

import ConfirmationModal from "../utils/ConfirmationModal";
import { deleteRange, deleteAll } from "../../redux/history/thunks";
import { useAppDispatch } from "@src/pages/options/redux/store";

const DeleteMultiple = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

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
        <MenuItem
          onClick={() => {
            const time30MinsAgo = dayjs().subtract(30, "minute").valueOf();

            dispatch(
              deleteRange({
                startTime: time30MinsAgo,
                endTime: dayjs().valueOf(),
              })
            );
          }}
        >
          Last 30 Mins
        </MenuItem>
        <MenuItem
          onClick={() => {
            const timeHourAgo = dayjs().subtract(1, "hours").valueOf();

            dispatch(
              deleteRange({
                startTime: timeHourAgo,
                endTime: dayjs().valueOf(),
              })
            );
          }}
        >
          Last 1 Hour
        </MenuItem>
        <MenuItem
          onClick={() => {
            const time24HoursAgo = dayjs().subtract(24, "hours").valueOf();

            dispatch(
              deleteRange({
                startTime: time24HoursAgo,
                endTime: dayjs().valueOf(),
              })
            );
          }}
        >
          Last 24 Hours
        </MenuItem>
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
            onConfirm={() => dispatch(deleteAll())}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DeleteMultiple;
