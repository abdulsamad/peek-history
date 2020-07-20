import React from 'react';
import { useOptionsState } from '../../../context/optionsContext';
import {
	makeStyles,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';
import DeleteModal from './DeleteModal';
import DeleteAllModal from './DeleteAllModal';

const useStyles = makeStyles({
	table: {
		minWidth: '75%',
	},
	gridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function ExcludeURLList() {
	const { excludedURLs } = useOptionsState();
	const classes = useStyles();

	return (
		<>
			{excludedURLs.length > 0 && (
				<Grid container>
					<Grid item md={1}></Grid>
					<Grid item md={10}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell align='center'>Domain</TableCell>
										<TableCell align='center'>URL</TableCell>
										<TableCell align='center'>-</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{excludedURLs.map((url) => (
										<TableRow key={url}>
											<TableCell component='th' align='center' scope='row'>
												{new URL(url).host}
											</TableCell>
											<TableCell align='center'>{url}</TableCell>
											<TableCell align='center'>
												<DeleteModal url={url} />
											</TableCell>
										</TableRow>
									))}
									<TableRow>
										<TableCell scope='row' colSpan={3} padding='none'>
											<DeleteAllModal />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={1}></Grid>
				</Grid>
			)}
		</>
	);
}

export default ExcludeURLList;
