import {
  makeStyles,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
  Typography,
} from '@material-ui/core';

import { useOptionsState, useOptionsDispatch } from '../../../context/optionsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1.5rem 0',
  },
  formControl: {
    width: '100%',
  },
  select: {
    '& > .MuiSelect-root': {
      padding: 12,
    },
  },
}));

function Theme() {
  const { theme } = useOptionsState();
  const { setTheme } = useOptionsDispatch();
  const classes = useStyles();

  const handleChange = (ev) => {
    setTheme(ev.target.value);
    chrome.storage.sync.set({ theme: ev.target.value });
  };

  return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item md={6}>
        <Typography variant='subtitle2' align='center'>
          Theme
        </Typography>
      </Grid>
      <Grid item md={4}>
        <FormControl variant='filled' className={classes.formControl} hiddenLabel={true}>
          <Select
            id='theme-select-filled'
            value={theme}
            className={classes.select}
            onChange={handleChange}>
            <MenuItem value='default'>Default</MenuItem>
            <MenuItem value='dark'>Dark</MenuItem>
            <MenuItem value='light'>Light</MenuItem>
          </Select>
          <FormHelperText>Default will be set according to your system preference.</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

export default Theme;
