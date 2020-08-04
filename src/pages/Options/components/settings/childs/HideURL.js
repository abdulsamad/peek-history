import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	switchGrid: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

function HideURL() {
	const [value, setValue] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get('hideURL', ({ hideURL }) => {
			if (hideURL) setValue(hideURL);
		});
	}, []);

	const onChange = (ev) => {
		setValue((prevState) => !prevState);
		chrome.storage.sync.set({ hideURL: ev.target.checked });
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Hide URL
				</Typography>
			</Grid>
			<Grid item md={4} className={classes.switchGrid}>
				<Switch
					checked={value}
					onChange={onChange}
					color='primary'
					inputProps={{ 'aria-label': "Hide URL's" }}
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default HideURL;
