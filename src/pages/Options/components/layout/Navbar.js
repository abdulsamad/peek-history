import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: 'auto',
    maxWidth: '12ch',
    color: '#fff',
    fontWeight: 600,
  },
}));

function Navbar({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Typography className={classes.title} variant='h5' noWrap>
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
