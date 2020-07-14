import React, { useState } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Button,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteAllModal() {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const deleteAll = (ev) => {
		chrome.storage.sync.remove('excludedObj');
		setOpen(false);
	};

	return (
		<>
			<Button variant='contained' onClick={() => setOpen(true)} fullWidth={true}>
				Delete All
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					{'Are you sure you want to delete all excluded websites?'}
				</DialogTitle>
				{/* <DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<strong>Note:</strong> Deleting this also deletes this from your browser history.
					</DialogContentText>
				</DialogContent> */}
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={deleteAll} color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default DeleteAllModal;
