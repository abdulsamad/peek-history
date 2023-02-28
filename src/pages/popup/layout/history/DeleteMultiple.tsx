import React from "react";
import { Menu, MenuItem, ButtonBase, menuItemClasses } from "@mui/material";
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
        component="div"
        sx={{ height: "100%", width: "100%" }}
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
        sx={{
          li: { padding: 0 },
          "li > div": { flex: 1 },
        }}
      >
        <MenuItem>
          <ConfirmationModal
            sx={{ padding: "6px 16px", height: "36px", width: "100%" }}
            text="Last 30 Mins"
            question="Clear History?"
            warning={
              <>
                <strong>Note:</strong> This will delete all your browsing
                history in last 30 minutes.
              </>
            }
            onConfirm={() => {
              const time30MinsAgo = dayjs().subtract(30, "minute").valueOf();

              dispatch(
                deleteRange({
                  startTime: time30MinsAgo,
                  endTime: dayjs().valueOf(),
                })
              );
            }}
          />
        </MenuItem>
        <MenuItem>
          <ConfirmationModal
            sx={{ padding: "6px 16px", height: "36px", width: "100%" }}
            text="Last 1 Hour"
            question="Clear History?"
            warning={
              <>
                <strong>Note:</strong> This will delete all your browsing
                history in last hour.
              </>
            }
            onConfirm={() => {
              const timeHourAgo = dayjs().subtract(1, "hours").valueOf();

              dispatch(
                deleteRange({
                  startTime: timeHourAgo,
                  endTime: dayjs().valueOf(),
                })
              );
            }}
          />
        </MenuItem>
        <MenuItem>
          <ConfirmationModal
            sx={{ padding: "6px 16px", height: "36px", width: "100%" }}
            text="Last 6 Hours"
            question="Clear History?"
            warning={
              <>
                <strong>Note:</strong> This will delete all your browsing
                history in last 6 hours.
              </>
            }
            onConfirm={() => {
              const timeHourAgo = dayjs().subtract(6, "hours").valueOf();

              dispatch(
                deleteRange({
                  startTime: timeHourAgo,
                  endTime: dayjs().valueOf(),
                })
              );
            }}
          />
        </MenuItem>
        <MenuItem>
          <ConfirmationModal
            sx={{ padding: "6px 16px", height: "36px", width: "100%" }}
            text="Last 24 Hours"
            question="Clear History?"
            warning={
              <>
                <strong>Note:</strong> This will delete all your browsing
                history in last 24 hours.
              </>
            }
            onConfirm={() => {
              const time24HoursAgo = dayjs().subtract(24, "hours").valueOf();

              dispatch(
                deleteRange({
                  startTime: time24HoursAgo,
                  endTime: dayjs().valueOf(),
                })
              );
            }}
          />
        </MenuItem>
        <MenuItem>
          <ConfirmationModal
            sx={{ padding: "6px 16px", height: "36px", width: "100%" }}
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
