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
import { useOptionsDispatch } from '../../../context/optionsContext';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteAllModal() {
	const [open, setOpen] = useState(false);
	const { removeAllExcludedURLs } = useOptionsDispatch();

	const handleClose = () => {
		setOpen(false);
	};

	const deleteAll = (ev) => {
		removeAllExcludedURLs();
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
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<strong>Note:</strong> This action will remove all your excluded websites and they will
						continue to open in a normal tab/default way.
					</DialogContentText>
				</DialogContent>
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
