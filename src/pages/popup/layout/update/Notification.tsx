import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Slide,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { useAppDispatch } from "../../redux/store";
import { setShowUpdatePopup } from "../../redux/ui/ui-slice";
import KBD from "../utils/KBD";

const WhatsNew = [
  <Typography lineHeight="1.5em" key="shortcut">
    Changed shortcuts modifier from <KBD>CTRL</KBD> to <KBD>Alt/Option</KBD>
  </Typography>,
  "Added option to delete history in time ranges",
  "Added setting to set tab (current or new blank) for opening URLs",
  "Added hide time and accent font color setting in options",
  "Improved keyboard navigation and shortcuts",
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface INotification {
  showUpdatePopup: boolean;
}

const Notification = ({ showUpdatePopup }: INotification) => {
  const dispatch = useAppDispatch();
  const version = chrome.runtime.getManifest().version;

  const closeShowUpdatePopup = useCallback(async () => {
    dispatch(setShowUpdatePopup(false));
    await chrome.storage.sync.set({ showUpdatePopup: false });
  }, []);

  return (
    <div>
      <Dialog
        open={showUpdatePopup}
        onClose={closeShowUpdatePopup}
        TransitionComponent={Transition}
      >
        <DialogTitle textAlign="center" fontStyle="italic">
          Updated to {version}! 🎉
        </DialogTitle>
        <Typography sx={{ padding: "0 1em" }} fontWeight="600">
          What&apos;s New
        </Typography>
        <List sx={{ fontSize: "0.5rem" }} dense={true}>
          {WhatsNew.map((log, index) => (
            <ListItem key={index}>
              <ListItemText sx={{ fontSize: "0.9rem" }} disableTypography>
                {log}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ padding: "1em", display: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{ "&:hover": { backgroundColor: "primary.main" } }}
            onClick={closeShowUpdatePopup}
          >
            Got it!
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default Notification;
