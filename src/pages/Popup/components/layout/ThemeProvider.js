import React, { useState, useEffect, useMemo } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core';

function ThemeProviderContainer({ children }) {
	const [theme, setTheme] = useState('default');
	const [accent, setAccent] = useState('#64B5F6');
	const [width, setWidth] = useState(400);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	useEffect(() => {
		chrome.storage.sync.get(['theme', 'accent', 'popupWidth'], ({ theme, accent, popupWidth }) => {
			if (theme) setTheme(theme);
			if (accent) setAccent(accent);
			if (popupWidth) setWidth(popupWidth);
		});
	}, []);

	const customTheme = useMemo(
		() =>
			createMuiTheme({
				overrides: {
					MuiCssBaseline: {
						'@global': {
							body: {
								height: 600,
								width: width,
								overflow: 'hidden',
								margin: '0',
							},
							'*::-webkit-scrollbar': {
								backgroundColor: theme === 'dark' ? '#222' : '#f9f9f9',
								border: 'none',
							},
							'*::-webkit-scrollbar-thumb': {
								backgroundColor: accent,
								borderRadius: 10,
							},
						},
					},
				},
				palette: {
					type:
						theme === 'default'
							? prefersDarkMode
								? 'dark'
								: 'light'
							: theme === 'dark'
							? 'dark'
							: 'light',
					primary: {
						main: accent,
					},
					secondary: {
						main: '#0044ff',
					},
					background: {
						default: theme === 'dark' ? '#222' : '#f5f5f5',
						paper: theme === 'dark' ? '#000' : '#f5f5f5',
					},
				},
			}),
		[theme, accent, width, prefersDarkMode],
	);

	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default ThemeProviderContainer;
