import React from 'react';
import { Container, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { Looks as LooksIcon } from '@material-ui/icons';
import Theme from './childs/Theme';
import Font from './childs/Font';
import AccentColor from './childs/AccentColor';
import PopupWidth from './childs/PopupWidth';
import HideURL from './childs/HideURL';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '16 auto',
	},
	paper: {
		padding: 16,
		margin: 10,
	},
}));

function Appearance() {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
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
			</Paper>
		</Container>
	);
}

export default Appearance;
