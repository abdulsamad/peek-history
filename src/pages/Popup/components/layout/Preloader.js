import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
}));

function Preloader() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}

export default Preloader;
