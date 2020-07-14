import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Button,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function DeleteModal({ url }) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const deleteURL = () => {
		chrome.storage.sync.get('excludedObj', ({ excludedObj }) => {
			const obj = { ...excludedObj };
			const link = new URL(url);
			const filteredUrl = `*://${link.host}${link.pathname}*`;
			const excludedUrlArr = obj.excludedUrlArr.filter((val) => url !== val);
			const filteredArr = obj.filteredArr.filter((val) => filteredUrl !== val);

			chrome.storage.sync.set({
				excludedObj: { excludedUrlArr, filteredArr },
			});
		});

		setOpen(false);
	};

	return (
		<>
			<Button variant='contained' color='secondary' onClick={() => setOpen(true)}>
				Delete
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title'>
					{'Are you sure you want to delete this website from exclusion?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<strong>URL:</strong> {url}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={deleteURL} color='secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

DeleteModal.propTypes = {
	url: PropTypes.string.isRequired,
};

export default DeleteModal;
