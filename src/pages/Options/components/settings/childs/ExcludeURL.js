import React from 'react';
import { useOptionsState, useOptionsDispatch } from '../../../context/optionsContext';
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

function ExcludeURL() {
	const { incognito } = useOptionsState();
	const { setIncognito } = useOptionsDispatch();
	const classes = useStyles();

	const onChange = (ev) => {
		const checked = ev.target.checked;

		if (checked) {
			chrome.permissions.request(
				{
					permissions: ['webRequestBlocking', 'webRequest'],
					origins: ['http://*/*', 'https://*/*'],
				},
				(granted) => {
					if (granted) {
						setIncognito(true);
						chrome.storage.sync.set({ incognito: true });
					}
				},
			);
		} else {
			chrome.permissions.remove(
				{
					permissions: ['webRequestBlocking', 'webRequest'],
					origins: ['http://*/*', 'https://*/*'],
				},
				(removed) => {
					if (removed) {
						setIncognito(false);
						chrome.storage.sync.set({ incognito: false });
					}
				},
			);
		}
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Exclude URL's
				</Typography>
			</Grid>
			<Grid item md={4} className={classes.switchGrid}>
				<Switch
					checked={incognito}
					onChange={onChange}
					color='primary'
					inputProps={{ 'aria-label': "Exclude URL's" }}
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default ExcludeURL;
