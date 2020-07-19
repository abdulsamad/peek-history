import React from 'react';
import { Container, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import Sort from './childs/Sort';
import ExcludeURL from './childs/ExcludeURL';
import ExcludeURLForm from './childs/ExcludeURLForm';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '16px auto',
	},
	paper: {
		padding: 16,
		margin: 10,
	},
}));

function Settings() {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<Typography variant='h6' gutterBottom>
					<IconButton>
						<SettingsIcon />
					</IconButton>
					Settings
				</Typography>
				<Sort />
				<ExcludeURL />
				<ExcludeURLForm />
			</Paper>
		</Container>
	);
}

export default Settings;
