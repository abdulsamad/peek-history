import { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Slider,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1.5rem 0',
  },
  formControl: {
    width: '100%',
  },
  formHelperText: {
    textAlign: 'center',
  },
}));

function PopupWidth() {
  const [value, setValue] = useState(400);
  const classes = useStyles();

  useEffect(() => {
    chrome.storage.sync.get('popupWidth', ({ popupWidth }) => {
      if (popupWidth) setValue(popupWidth);
    });
  }, []);

  const onChange = (ev, value) => {
    setValue(value);
    chrome.storage.sync.set({ popupWidth: value });
  };

  return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item md={6}>
        <Typography align='center' variant='subtitle2'>
          Popup Width
        </Typography>
      </Grid>
      <Grid item md={4}>
        <FormControl className={classes.formControl} hiddenLabel={true}>
          <Slider
            aria-labelledby='popup-width-slider'
            min={250}
            max={700}
            step={10}
            value={value}
            onChange={onChange}
            valueLabelDisplay='auto'
          />
          <FormHelperText className={classes.formHelperText}>Default value is 400.</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

export default PopupWidth;
