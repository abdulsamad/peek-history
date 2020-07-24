import React, { useState, useEffect, useRef } from 'react';
import { useOptionsState, useOptionsDispatch } from '../../../context/optionsContext';
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
			position: 'absolute',
			top: 0,
			left: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'rgba(0,0,0,0.3)',
			borderRadius: '50%',
		},

		'&:focus': {
			outline: 'none',
		},
	},
	roundedInputColor: {
		height: 30,
		width: 30,
		border: 'none',
		borderRadius: 5,
		backgroundColor: '#C7C7C7',

		'&.active::after': {
			outline: '1px solid currentColor',
		},
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between	',
	},
}));

function AccentColor() {
	const [accents, setAccents] = useState([
		{ color: '#64B5F6', active: true },
		{ color: '#E57373', active: false },
		{ color: '#4db6ac', active: false },
		{ color: '#4dd0e1', active: false },
		{ color: '#ffd54f', active: false },
		{ color: '#f06292', active: false },
	]);
	const [customColor, setCustomColor] = useState(false);
	const { accent } = useOptionsState();
	const { setAccent } = useOptionsDispatch();
	const classes = useStyles();
	const inputColor = useRef();

	useEffect(() => {
		chrome.storage.sync.get('accent', ({ accent }) => {
			if (!accent) return;

			const accentsArr = accents.map((acc) => {
				if (acc.color === accent) {
					return { color: acc.color, active: true };
				} else {
					return { color: acc.color, active: false };
				}
			});

			setAccents(accentsArr);

			const arr = accentsArr.filter((acc) => acc.active === true).length;
			if (arr === 0) setCustomColor(true);
		});
	}, []);

	const onClick = (color) => {
		chrome.storage.sync.set({ accent: color });
		setAccent(color);
		setAccents((prevState) =>
			prevState.map((acc) => {
				if (acc.color === color) {
					return { color: acc.color, active: true };
				} else {
					return { color: acc.color, active: false };
				}
			}),
		);
	};

	// TODO: Add Custom color
	// const onChange = ({ target: value }) => {
	// 	setAccent(value);
	// 	chrome.storage.sync.set({ accent: value });
	// 	// console.log(value);
	// };

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
				{/* <input
					type='color'
					onFocus={onFocus}
					// onChange={onChange}
					value={accent}
					ref={inputColor}
					className={`${classes.roundedInputColor} ${customColor ? 'active' : ''}`}
				/> */}
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default AccentColor;
