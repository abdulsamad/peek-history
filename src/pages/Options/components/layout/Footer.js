import PropTypes from 'prop-types';
import { makeStyles, Typography, Link } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
	center: {
		textAlign: 'center',
	},
}));

function Footer({ title }) {
	const classes = useStyle();

	return (
		<footer className={classes.center}>
			<Typography variant='subtitle1'>
				Please leave a positive rating on the{' '}
				<Link
					underline='none'
					href='https://chrome.google.com/webstore/detail/peek-history/gknodemjjckmkncijnedcpogffimkmbm?from=options'>
					Chrome Web Store,
				</Link>{' '}
				If you like this extension and leave a feedback.
			</Typography>
		</footer>
	);
}

Footer.propType = {
	title: PropTypes.string.isRequired,
};

export default Footer;
