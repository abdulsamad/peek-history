import { makeStyles, Typography, Link } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  center: {
    textAlign: 'center',
  },
}));

function Footer() {
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

export default Footer;
