import PropTypes from 'prop-types';
import { Search as SearchIcon } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, InputBase, fade, makeStyles } from '@material-ui/core';

import { usePopupDispatch } from '../../context/popupContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    '&:focus-within h6': {
      display: 'none',
    },
  },
  nav: {
    height: 60,
  },
  title: {
    maxWidth: '12ch',
    color: '#f5f5f5',
    fontWeight: 600,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 'auto',
    width: '2rem',
    transition: 'all .3s ease-out',
    transformOrigin: 'right',

    '&:focus-within': {
      width: '100%',
    },
  },
  searchIcon: {
    cursor: 'pointer',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f5f5f5',
  },
  inputRoot: {
    color: '#f5f5f5',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    borderRadius: 10,
    backgroundColor: 'transparent',
    width: '0',
    cursor: 'pointer',

    '&:focus': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      width: '100%',
      cursor: 'text',
    },
  },
}));

function Navbar({ title }) {
  const { search } = usePopupDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.nav}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            {title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search History…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyUp={(ev) => search(ev.target.value)}
              inputProps={{ 'aria-label': 'search', className: 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
