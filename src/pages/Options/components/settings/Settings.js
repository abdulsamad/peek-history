import React from 'react';
import { Container, makeStyles, Card, Typography, IconButton } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import Sort from './Sort';
import ExcludeURL from './ExcludeURL';
import ExcludeURLForm from './ExcludeURLForm';
import ExcludeURLList from './ExcludeURLList';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '16 auto',
	},
	card: {
		padding: 16,
		margin: 10,
	},
}));

function Settings() {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Card className={classes.card}>
				<Typography variant='h6' gutterBottom>
					<IconButton>
						<SettingsIcon />
					</IconButton>
					Settings
				</Typography>
				<Sort />
				<ExcludeURL />
				<ExcludeURLForm />
				<ExcludeURLList />
			</Card>
		</Container>
	);
}

export default Settings;
