import React from 'react';
import { Container, makeStyles, Card, Typography, IconButton } from '@material-ui/core';
import { Looks as LooksIcon } from '@material-ui/icons';
import Theme from './Theme';
import Font from './Font';
import AccentColor from './AccentColor';
import PopupWidth from './PopupWidth';
import HideURL from './HideURL';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '16 auto',
	},
	card: {
		padding: 16,
		margin: 10,
	},
}));

function Appearance() {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Card className={classes.card}>
				<Typography variant='h6' gutterBottom>
					<IconButton>
						<LooksIcon />
					</IconButton>
					Appearance
				</Typography>
				<Theme />
				<Font />
				<AccentColor />
				<PopupWidth />
				<HideURL />
			</Card>
		</Container>
	);
}

export default Appearance;
