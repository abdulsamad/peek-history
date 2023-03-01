import React, { useState, forwardRef } from "react";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  styled,
  SxProps,
  Theme,
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

const Container = styled("div")(() => ({
  padding: 0,
}));

interface IConfirmationModal {
  question: string;
  warning: React.ReactNode;
  onConfirm: () => void;
  icon?: React.ReactNode;
  text?: string;
  ButtonProps?: any;
  sx?: SxProps<Theme> | undefined;
}

const ConfirmationModal = ({
  question,
  warning,
  onConfirm,
  icon,
  text,
  ButtonProps,
  sx,
}: IConfirmationModal) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      {icon && (
        <IconButton sx={sx} onClick={() => setOpen(true)} {...ButtonProps}>
          {icon}
        </IconButton>
      )}
      {text && (
        <ButtonBase sx={sx} onClick={() => setOpen(true)} {...ButtonProps}>
          {text}
        </ButtonBase>
      )}
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
    </Container>
  );
};

export default ConfirmationModal;
