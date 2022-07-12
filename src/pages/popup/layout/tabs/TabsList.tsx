import React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  List,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Accordion } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import TabItem from "../utils/ListItem";
import WindowItem from "../utils/WindowItem";
import { RootState, useAppDispatach } from "../../redux/store";
import { restoreSession } from "../../redux/tabs/thunks";
import { OpenURL } from "../../redux/ui/ui-slice";

const TabsList = () => {
  const tabs = useSelector((state: RootState) => state.tabs);
  const UI = useSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatach();

  const onTabClick = async (url: string) => {
    // Open link in new tab
    if (UI.openURL === OpenURL.NEW_TAB) {
      await chrome.tabs.create({ url });
      return;
    }

    // Open link in current tab
    await chrome.tabs.update({ url });
  };

  const onRestoreClick = async (id: string) => {
    await dispatch(restoreSession(id));
  };

  return (
    <div>
      {/* Recently Closed Tabs */}
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Recently Closed Tabs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="Recently Closed Tabs">
            {tabs.recent.map(({ tab, window }) => {
              // Session contains window
              if (window)
                return (
                  <WindowItem
                    key={window.sessionId}
                    window={window}
                    hideURL={false}
                    onRestoreClick={() => onRestoreClick(window.sessionId)}
                    onTabClick={onTabClick}
                  />
                );

              // Session contains tab
              return (
                <TabItem
                  key={tab.title}
                  title={tab.title}
                  url={tab.url}
                  hideURL={false}
                  onClick={() => onTabClick(tab.url)}
                />
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Other Tabs (Remote devices tabs and sessions) */}
      {tabs.other.map((device) => (
        <Accordion
          key={device.deviceName}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{device.deviceName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List aria-label="Tabs on other devices">
              {device.sessions.map((session) => {
                const { window } = session;

                // Session contains window
                if (session.window.tabs.length !== 1)
                  return (
                    <WindowItem
                      key={window.sessionId}
                      window={window}
                      hideURL={false}
                      onRestoreClick={() => onRestoreClick(window.sessionId)}
                      onTabClick={onTabClick}
                    />
                  );

                // Session also contains tab (Other Tab (Tab form other device) will still have structure like window)
                return (
                  <TabItem
                    key={window.tabs[0].title}
                    title={window.tabs[0].title}
                    url={window.tabs[0].url}
                    hideURL={false}
                    onClick={() => onTabClick(window.tabs[0].url)}
                  />
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default TabsList;
