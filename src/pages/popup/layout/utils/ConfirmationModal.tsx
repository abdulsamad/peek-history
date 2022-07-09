import React, { useState, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

// Transition Element
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IConfirmationModal {
  icon: React.ReactNode;
  iconButtonProps: any;
  question: string;
  warning: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  icon,
  iconButtonProps,
  question,
  warning,
  onConfirm,
}: IConfirmationModal) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)} {...iconButtonProps}>
        {icon}
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{question}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {warning}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
