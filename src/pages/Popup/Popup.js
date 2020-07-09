import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from './components/layout/Navbar';
import BottomNavbar from './components/layout/BottomNavbar';
import PopupState from './context/popupState';
import Home from './components/home/Home';

const Popup = () => {
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: 'dark',
				},
			}),
		[],
	);

	return (
		<ThemeProvider theme={theme}>
			<PopupState>
				<div className='App'>
					<Navbar title='Peek History' />
					<Home />
					<BottomNavbar />
				</div>
			</PopupState>
		</ThemeProvider>
	);
};

export default Popup;
