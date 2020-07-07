import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopupContext from '../../../context/popupContext';
import RecentsTabsListItem from './RecentsTabsListItem';
import OtherTabsListItem from './OtherTabsListItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 60,
    bottom: 60,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  list: {
    width: '100%',
    padding: 0,
  },
}));

function TabsList() {
  const classes = useStyles();
  const popupContext = useContext(PopupContext);
  const { recentTabs, otherTabs } = popupContext;

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Recently Closed Tabs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            component="div"
            aria-label="Recently Closed Tabs"
            className={classes.list}
          >
            {recentTabs.map((tab) => (
              <RecentsTabsListItem
                {...tab}
                key={tab.tab ? tab.lastModified : tab.window.sessionId}
              />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {otherTabs.map((device) => (
        <Accordion key={device.deviceName}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {device.deviceName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              component="div"
              aria-label="Recently Closed Tabs"
              className={classes.list}
            >
              {device.sessions.map((dev) => (
                <OtherTabsListItem {...dev} key={dev.window.sessionId} />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default TabsList;
