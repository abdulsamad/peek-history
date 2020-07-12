import React from 'react';
import { makeStyles, Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

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

function ExcludeURLForm() {
	const classes = useStyles();

	const onSubmit = (ev) => {
		ev.preventDefault();
		console.log(ev);
	};

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Add Exclude URL</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4} className={classes.gridItem}>
				<Paper component='form' className={classes.root}>
					<InputBase
						className={classes.input}
						placeholder='https://example.com'
						inputProps={{ 'aria-label': 'Exclude URL' }}
					/>
					<IconButton type='submit' aria-label='AddExcludeSearchURL' onSubmit={onSubmit}>
						<SendIcon />
					</IconButton>
				</Paper>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default ExcludeURLForm;
