import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
}));

function PopupWidth() {
	const [value, setValue] = useState(0);
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get(['popupWidth'], (syncWidth) => {
			if (!syncWidth.popupWidth) return;
			setValue(syncWidth.popupWidth);
		});
	}, []);

	const onChange = (ev, value) => {
		setValue(value);
		chrome.storage.sync.set({ popupWidth: value });
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Popup Width
				</Typography>
			</Grid>
			<Grid item md={4}>
				<Slider
					aria-labelledby='popup-width-slider'
					min={250}
					max={700}
					step={10}
					value={value}
					onChange={onChange}
					valueLabelDisplay='auto'
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default PopupWidth;
