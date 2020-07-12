import React from 'react';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	roundedBtn: {
		height: 30,
		width: 30,
		border: 'none',
		borderRadius: '50%',

		'&.active::after': {
			// content: '\2714',
			content: '',
			height: 30,
			width: 30,
			color: '#fff',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			top: 0,
			left: 0,
			backgroundColor: 'rgba(255,255,255,0.4)',
			border: '2px solid #000000',
			borderRadius: '50%',
		},

		'&:focus': {
			outline: 'none',
		},
	},
	roundedInputColor: {
		height: 30,
		width: 30,
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between	',
	},
}));

function AccentColor() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Accent</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4} className={classes.btnContainer}>
				<button
					className={classes.roundedBtn}
					onClick={(ev) => ev.target.classList.add('active')}
					data-color='#E57373'
					style={{ backgroundColor: '#e57373' }}></button>
				<button
					className={classes.roundedBtn}
					data-color='#64B5F6'
					style={{ backgroundColor: '#64B5F6' }}></button>
				<button
					className={classes.roundedBtn}
					data-color='#4db6ac'
					style={{ backgroundColor: '#4db6ac' }}></button>
				<button
					className={classes.roundedBtn}
					data-color='#4dd0e1'
					style={{ backgroundColor: '#4dd0e1' }}></button>
				<button
					className={classes.roundedBtn}
					data-color='#ffd54f'
					style={{ backgroundColor: '#ffd54f' }}></button>
				<button
					className={classes.roundedBtn}
					data-color='#f06292'
					style={{ backgroundColor: '#f06292' }}></button>
				<input className={classes.roundedInputColor} type='color' />
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default AccentColor;
