import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { usePopupDispatch } from '../../../context/popupContext';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteModal({ url }) {
	const [open, setOpen] = useState(false);
	const { getHistory, deleteHistory } = usePopupDispatch();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<DeleteIcon onClick={() => setOpen(true)} fontSize='small' />
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>{'Delete History Item?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<strong>Note:</strong> Deleting this also deletes this from your browser history.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='default'>
						Cancel
					</Button>
					<Button
						onClick={() => {
							deleteHistory(url);
							setOpen(false);
						}}
						color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default DeleteModal;
