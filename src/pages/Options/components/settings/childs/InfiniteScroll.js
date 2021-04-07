import { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Switch, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	switchGrid: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	formHelperText: {
		textAlign: 'center',
	},
}));

function InfiniteScroll() {
	const [value, setValue] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get('infinite', ({ infinite }) => {
			if (infinite) setValue(infinite);
		});
	}, []);

	const onChange = ({ target: { checked } }) => {
		setValue((prevState) => !prevState);
		chrome.storage.sync.set({ infinite: checked });
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Infinite Scroll
				</Typography>
			</Grid>
			<Grid item md={4} className={classes.switchGrid}>
				<Switch
					checked={value}
					onChange={onChange}
					color='primary'
					inputProps={{ 'aria-label': 'infiniteScroll' }}
				/>
				<FormHelperText className={classes.formHelperText}>
					Disable this if you have low-end device and facing lag while scrolling.
				</FormHelperText>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default InfiniteScroll;
