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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { useAppDispatch } from "../../redux/store";
import { setShowUpdatePopup } from "../../redux/ui/ui-slice";

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
      <Dialog open={showUpdatePopup} TransitionComponent={Transition}>
        <DialogTitle textAlign="center">Updated to {version}! 🎉</DialogTitle>
        <List>
          <ListItem>
            <ListItemText>
              Added option to delete history in 3 time ranges
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Improved keyboard navigation and shortcuts
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Changed shortcuts modifier from CTRL to Alt/Option
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Added setting to set tab (current or new blank) for opening URLs
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Added hide time and accent font color setting in options
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Increased favicon quality with New Favicon API
            </ListItemText>
          </ListItem>
        </List>
        <Box
          sx={{ padding: "1em", display: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="small"
            color="info"
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
