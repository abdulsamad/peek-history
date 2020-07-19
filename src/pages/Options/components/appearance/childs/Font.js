import React, { useEffect, useState } from 'react';
import { useOptionsState, useOptionsDispatch } from '../../../context/optionsContext';
import { makeStyles, Grid, Typography, FormHelperText, TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '1.5rem 0',
	},
	formHelperText: {
		margin: 'auto 14px',
	},
}));

function Fonts() {
	const { font } = useOptionsState();
	const { setFont } = useOptionsDispatch();
	const [fontList, setFontList] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		chrome.fontSettings.getFontList((fonts) => setFontList(fonts));
	}, []);

	const onInputChange = (ev, value) => {
		setFont(value);
	};

	const onChange = (ev, { displayName }) => {
		chrome.storage.sync.set({ font: displayName });
	};

	return (
		<Grid container alignItems='center' className={classes.root}>
			<Grid item md={6}>
				<Typography variant='subtitle2' align='center'>
					Font
				</Typography>
			</Grid>
			<Grid item md={4}>
				<Autocomplete
					size='small'
					options={fontList}
					getOptionLabel={(option) => option.displayName}
					inputValue={font}
					onInputChange={onInputChange}
					onChange={onChange}
					noOptionsText='No Fonts Available'
					filterOptions={createFilterOptions({
						limit: 5,
					})}
					renderOption={(option) => (
						<Typography variant='body1' style={{ fontFamily: option.displayName }}>
							{option.displayName}
						</Typography>
					)}
					renderInput={(params) => (
						<TextField {...params} label='Enter Font Name' variant='filled' />
					)}
				/>
				<FormHelperText className={classes.formHelperText}>
					<strong>Note:</strong> Font should be installed on the computer.
				</FormHelperText>
			</Grid>
			<Grid item md={2}></Grid>
		</Grid>
	);
}

export default Fonts;
