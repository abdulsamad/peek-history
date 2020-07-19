import React, { useState } from 'react';
import { useOptionsDispatch } from '../../../context/optionsContext';
import { makeStyles, Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import ExcludeURLList from './ExcludeURLList';

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
	const [value, setValue] = useState('');
	const { addExcludeURL } = useOptionsDispatch();
	const classes = useStyles();

	const onSubmit = (ev) => {
		ev.preventDefault();
		if (value === '') return;

		addExcludeURL(value);

		setValue('');
	};

	return (
		<>
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
							type='url'
							value={value}
							onChange={(ev) => setValue(ev.target.value)}
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
			<ExcludeURLList />
		</>
	);
}

export default ExcludeURLForm;
