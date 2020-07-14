import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	roundedBtn: {
		height: 30,
		width: 30,
		border: 'none',
		borderRadius: '50%',
		position: 'relative',
		cursor: 'pointer',

		'&.active::after': {
			content: '"\\2714"',
			fontSize: 15,
			height: 30,
			width: 30,
			color: '#000',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			top: 0,
			left: 0,
			backgroundColor: 'rgba(255,255,255,0.4)',
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
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between	',
	},
}));

function AccentColor() {
	const [accents, setAccents] = useState([
		{ color: '#E57373', active: false },
		{ color: '#64B5F6', active: false },
		{ color: '#4db6ac', active: false },
		{ color: '#4dd0e1', active: false },
		{ color: '#ffd54f', active: false },
		{ color: '#f06292', active: false },
	]);
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get(['accent'], (syncAccent) => {
			if (!syncAccent.accent) return;

			setAccents((prevState) =>
				prevState.map((accent) => {
					if (accent.color === syncAccent.accent) {
						return { color: accent.color, active: true };
					} else {
						return { color: accent.color, active: false };
					}
				}),
			);
		});
	}, []);

	const onClick = (color) => {
		chrome.storage.sync.set({ accent: color });
		setAccents((prevState) =>
			prevState.map((accent) => {
				if (accent.color === color) {
					return { color: accent.color, active: true };
				} else {
					return { color: accent.color, active: false };
				}
			}),
		);
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Accent
				</Typography>
			</Grid>
			<Grid item md={4} className={classes.btnContainer}>
				{accents.map(({ color, active }) => (
					<button
						key={color}
						className={`${classes.roundedBtn} ${active ? 'active' : ''}`}
						onClick={() => onClick(color)}
						style={{ backgroundColor: color }}></button>
				))}
				<input className={classes.roundedInputColor} type='color' />
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default AccentColor;
