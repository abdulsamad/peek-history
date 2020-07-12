import React from 'react';
import { makeStyles, MenuItem, FormControl, Select, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	formControl: {
		width: '100%',
		padding: '1rem auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	select: {
		width: '80%',

		'& > .MuiSelect-root': {
			padding: 12,
		},
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

function Sort() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Sort By</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4}>
				<FormControl variant='filled' className={classes.formControl}>
					<Select
						labelId='sort-by'
						id='sort-by-select-filled'
						value='last-visit'
						className={classes.select}
						onChange={(ev) => console.log(ev.target.value)}>
						<MenuItem value='last-visit'>By Last Visit</MenuItem>
						<MenuItem value='most-visit'>By Most Visit</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default Sort;
