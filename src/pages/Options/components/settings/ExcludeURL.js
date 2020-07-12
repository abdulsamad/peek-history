import React from 'react';
import { makeStyles, Grid, Typography, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

function ExcludeURL() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Exclude URL's</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4} className={classes.gridItem}>
				<Switch
					// checked={state.checkedB}
					// onChange={handleChange}
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
