import { useState, useEffect } from 'react';
import {
	useOptionsState,
	useOptionsDispatch,
} from '../../../context/optionsContext';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { useDebouncedFn } from 'beautiful-react-hooks';

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
		{ color: '#64B5F6', active: false },
		{ color: '#E57373', active: false },
		{ color: '#4db6ac', active: false },
		{ color: '#4dd0e1', active: false },
		{ color: '#ffd54f', active: false },
		{ color: '#f06292', active: false },
	]);
	const [customColor, setCustomColor] = useState(null);
	const { accent: defaultAccent } = useOptionsState();
	const { setAccent } = useOptionsDispatch();
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get('accent', ({ accent }) => {
			const accentsArr = accents.map((acc) => {
				if (acc.color === accent) {
					return { color: acc.color, active: true };
				} else {
					return { color: acc.color, active: false };
				}
			});

			const defaultAccentArr = accents.map((acc) => {
				if (acc.color === defaultAccent) {
					return { color: acc.color, active: true };
				} else {
					return { color: acc.color, active: false };
				}
			});

			accent ? setAccents(accentsArr) : setAccents(defaultAccentArr);

			const arr = accentsArr.filter((acc) => acc.active === true).length;
			if (arr === 0) setCustomColor(true);
		});

		// eslint-disable-next-line
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

	const onChange = useDebouncedFn(
		(color) => {
			setAccent(color);
			chrome.storage.sync.set({ accent: color });
		},
		500,
		{
			leading: false,
			trailing: true,
		},
	);

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
				<input
					type='color'
					onChange={({ target: { value } }) => onChange(value)}
					value={defaultAccent}
					className={`${classes.roundedInputColor} ${
						customColor ? 'active' : ''
					}`}
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default AccentColor;
