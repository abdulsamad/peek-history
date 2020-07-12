import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Appearance from './components/appearance/Appearance';
import Settings from './components/settings/Settings';

function Options() {
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: 'dark',
					primary: {
						// light: will be calculated from palette.primary.main,
						main: '#64B5F6',
						// dark: will be calculated from palette.primary.main,
						// contrastText: will be calculated to contrast with palette.primary.main
					},

					secondary: {
						// light: '#0066ff',
						main: '#0044ff',
						// dark: will be calculated from palette.secondary.main,
						// contrastText: '#ffcc00',
					},
					background: {
						default: '#000000',
						paper: '#000000',
						container: '#000000',
					},
					text: {
						primary: '#fff',
						secondary: '#e3d3d3',
					},
				},
			}),
		[],
	);

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<Navbar title='Peek History' />
				<Appearance />
				<Settings />
				<Footer title='Peek History' />
			</div>
		</ThemeProvider>
	);
}

export default Options;
