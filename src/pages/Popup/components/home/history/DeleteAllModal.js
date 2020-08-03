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
	const [active, setActive] = useState(false);
	const [countdown, setCountdown] = useState(5);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		let count = 0;
		setOpen(true);

		const interval = setInterval(() => {
			count++;
			setCountdown((prevValue) => --prevValue);

			if (count === 5) {
				setActive(true);
				setCountdown(0);
				clearInterval(interval);
			}
		}, 1000);
	};

	return (
		<>
			<BottomNavigationAction
				className='deleteAll'
				onClick={handleOpen}
				icon={<DeleteForeverIcon />}
			/>
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
						color='secondary'
						className='confirmed-deleteAll'
						disabled={!active}>
						{active ? 'Delete' : `Wait ${countdown} secs`}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default DeleteModal;
