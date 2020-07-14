import React from 'react';
import { makeStyles, Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	input: {
		boxSizing: 'border-box',
		paddingLeft: 14,
		width: 'calc(100% - 48px)',
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
			<Grid item md={6}>
				<Typography align='center' variant='subtitle2'>
					Add Exclude URL
				</Typography>
			</Grid>
			<Grid item md={4}>
				<Paper component='form' onSubmit={onSubmit}>
					<InputBase
						className={classes.input}
						placeholder='https://example.com'
						inputProps={{ 'aria-label': 'Exclude URL' }}
					/>
					<IconButton type='submit' aria-label='AddExcludeSearchURL'>
						<SendIcon />
					</IconButton>
				</Paper>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default ExcludeURLForm;
