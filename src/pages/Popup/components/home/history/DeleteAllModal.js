import React, { useState } from 'react';
import { DeleteForever as DeleteForeverIcon } from '@material-ui/icons';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	BottomNavigationAction,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteModal() {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<BottomNavigationAction onClick={() => setOpen(true)} icon={<DeleteForeverIcon />} />
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>{'Clear History?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<strong>Note:</strong> This will delete all your browsing history.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='default'>
						Cancel
					</Button>
					<Button
						onClick={() => chrome.history.deleteAll(() => window.location.reload())}
						color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default DeleteModal;
