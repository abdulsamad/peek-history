import React from 'react';
import {
	makeStyles,
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';

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

export default function SimpleTable() {
	const classes = useStyles();

	return (
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
							<TableRow>
								<TableCell component='th' align='center' scope='row'>
									Google.com
								</TableCell>
								<TableCell align='center'>https://google.com</TableCell>
								<TableCell align='center'>
									<Button variant='contained' color='secondary'>
										Delete
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell scope='row' colSpan={3} padding='none'>
									<Button variant='contained' fullWidth={true}>
										Delete All
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item md={1}></Grid>
		</Grid>
	);
}
