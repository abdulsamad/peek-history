import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import PopupContext from '../../../context/popupContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteModal({ url }) {
  const popupContext = useContext(PopupContext);
  const [open, setOpen] = useState(false);
  const { deleteHistory } = popupContext;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DeleteIcon onClick={() => setOpen(true)} fontSize="small" />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Delete History Item?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <strong>Note:</strong> Deleting this also deletes this from your
            browser history.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteHistory(url);
              setOpen(false);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteModal;
