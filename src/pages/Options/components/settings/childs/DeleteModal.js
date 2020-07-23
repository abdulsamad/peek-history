import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOptionsDispatch } from '../../../context/optionsContext';
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

function DeleteModal({ url }) {
	const [open, setOpen] = useState(false);
	const { removeExcludedURL } = useOptionsDispatch();

	const handleClose = () => {
		setOpen(false);
	};

	const deleteURL = () => {
		removeExcludedURL(url);
		setOpen(false);
	};

	return (
		<>
			<Button variant='contained' onClick={() => setOpen(true)}>
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
					<Button onClick={handleClose} color='default'>
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
