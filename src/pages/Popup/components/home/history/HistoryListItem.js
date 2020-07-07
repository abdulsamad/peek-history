import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import DeleteModal from './DeleteModal';
import Typography from '@material-ui/core/Typography';
import ConvertTimeAgo from '../misc/ConvertTimeAgo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  listItemIcon: {
    height: 32,
    minWidth: 32,
  },
  favicon: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    width: 16,
    height: 16,
  },
  textContainer: {
    whiteSpace: 'nowrap',

    '& span': {
      width: 'calc(100% - 25px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& p': {
      width: 'calc(100% - 20px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  listItemSecondaryAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > span': {
      whitespace: 'nowrap',
      backgroundColor: theme.palette.background.paper,
    },
  },
  deleteIcon: {
    padding: 0,
  },
  anchor: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}));

function HistoryListItem({ title, url, lastVisitTime }) {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.root}>
        <Link
          color="inherit"
          href={url}
          block="true"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.anchor}
          underline="none"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Avatar
              src={`chrome://favicon/${url}`}
              alt={`${url.domain} Favicon`}
              className={classes.favicon}
            />
          </ListItemIcon>
          <ListItemText
            className={classes.textContainer}
            primary={
              title ? (
                <Typography variant="body1" display="block">
                  {title}
                </Typography>
              ) : (
                <Typography variant="body1" color="error" display="block">
                  (Title Not Available)
                </Typography>
              )
            }
            secondary={url}
          />
        </Link>
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          <IconButton
            edge="end"
            aria-label="delete"
            className={classes.deleteIcon}
          >
            <DeleteModal url={url} />
          </IconButton>
          <Typography variant="caption" display="block">
            {ConvertTimeAgo(lastVisitTime)}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>

      <Divider />
    </>
  );
}

export default HistoryListItem;
