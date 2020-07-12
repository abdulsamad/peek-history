import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	autocomplete: {
		width: '80%',
	},
	autocompleteInput: {
		// padding: 12,
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

function Fonts() {
	const [font, setFont] = useState('Roboto');
	const [fontList, setFontList] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		chrome.fontSettings.getFontList((fonts) => setFontList(fonts));
	}, []);

	return (
		<Grid container className={classes.root}>
			<Grid item md={4} className={classes.gridItem}>
				<Typography variant='subtitle2'>Font</Typography>
			</Grid>
			<Grid item md={2}></Grid>
			<Grid item md={4} className={classes.gridItem}>
				<Autocomplete
					className={classes.autocomplete}
					id='font'
					options={fontList}
					getOptionLabel={(option) => option.displayName}
					renderInput={(params) => (
						<TextField
							{...params}
							className={classes.autocompleteInput}
							label='Enter Font Name'
							variant='outlined'
						/>
					)}
				/>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default Fonts;
