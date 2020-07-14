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

function ExcludeURL() {
	const [value, setValue] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		chrome.storage.sync.get(['incognito'], (syncIncognito) => {
			if (!syncIncognito.incognito) return;
			setValue(syncIncognito.incognito);
		});
	}, []);

	const onChange = (ev) => {
		setValue((prevState) => !prevState);
		chrome.storage.sync.set({ incognito: ev.target.checked });

		chrome.permissions.request(
			{
				permissions: ['webRequestBlocking', 'webRequest'],
				origins: ['http://*/*', 'https://*/*'],
			},
			(granted) => {
				if (granted) {
					if (this.checked === true) {
						// Checked
						chrome.storage.sync.set({ incognito: true });
					} else {
						// Unchecked
						chrome.storage.sync.set({ incognito: false });
					}
				} else {
					this.checked = false;
					chrome.storage.sync.set({ incognito: false });
				}
			},
		);
	};

	return (
		<Grid container className={classes.root}>
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Exclude URL's
				</Typography>
			</Grid>
			<Grid item md={4} className={classes.switchGrid}>
				<Switch
					checked={value}
					onChange={onChange}
					color='primary'
					name='checkedB'
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default ExcludeURL;
