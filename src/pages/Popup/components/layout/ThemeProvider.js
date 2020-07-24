import React, { useState, useEffect, useMemo } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core';

function ThemeProviderContainer({ children }) {
	const [theme, setTheme] = useState('default');
	const [accent, setAccent] = useState('#64B5F6');
	const [width, setWidth] = useState(400);
	const [font, setFont] = useState('sans-serif');
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	useEffect(() => {
		chrome.storage.sync.get(
			['theme', 'accent', 'popupWidth', 'font'],
			({ theme, accent, popupWidth, font }) => {
				if (theme) setTheme(theme);
				if (accent) setAccent(accent);
				if (popupWidth) setWidth(popupWidth);
				if (font) setFont(font);
			},
		);
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
								transition: 'width 0.3s ease',
							},
							'*::-webkit-scrollbar': {
								backgroundColor:
									theme === 'default'
										? prefersDarkMode
											? '#222'
											: '#f9f9f9'
										: theme === 'dark'
										? '#222'
										: '#f9f9f9',
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
						main: '#F44336',
					},
					background: {
						default:
							theme === 'default'
								? prefersDarkMode
									? '#222'
									: '#f5f5f5'
								: theme === 'dark'
								? '#222'
								: '#f5f5f5',
						paper:
							theme === 'default'
								? prefersDarkMode
									? '#222'
									: '#f5f5f5'
								: theme === 'dark'
								? '#222'
								: '#f5f5f5',
					},
				},
				typography: {
					fontFamily: font,
				},
			}),
		[theme, accent, width, font, prefersDarkMode],
	);

	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default ThemeProviderContainer;