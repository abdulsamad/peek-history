import React from 'react';
import { makeStyles, Grid, Typography, Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

function PopupWidth() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Popup Width</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4} className={classes.gridItem}>
				<Slider
					defaultValue={30}
					min={250}
					max={700}
					step={10}
					aria-labelledby='popup-width-slider'
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default PopupWidth;
