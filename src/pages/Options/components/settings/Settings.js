import { Container, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import Theme from './childs/Theme';
import Font from './childs/Font';
import AccentColor from './childs/AccentColor';
import PopupWidth from './childs/PopupWidth';
import HideURL from './childs/HideURL';
import Sort from './childs/Sort';
import InfiniteScroll from './childs/InfiniteScroll';

const useStyles = makeStyles(() => ({
  root: {
    margin: '16px auto',
  },
  paper: {
    padding: 16,
    margin: 10,
  },
}));

function Settings() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant='h6' gutterBottom>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          Settings
        </Typography>
        <Theme />
        <Font />
        <AccentColor />
        <PopupWidth />
        <HideURL />
        <Sort />
        <InfiniteScroll />
      </Paper>
    </Container>
  );
}

export default Settings;
