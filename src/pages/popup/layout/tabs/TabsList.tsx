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

import { ISettings } from "@src/commons/redux/settings/defaults";
import TabItem from "../utils/ListItem";
import WindowItem from "../utils/WindowItem";
import { RootState, useAppDispatch } from "../../redux/store";
import { restoreSession } from "../../redux/tabs/thunks";

const TabsList = ({ settings }: { settings: ISettings }) => {
  const tabs = useSelector((state: RootState) => state.tabs);

  const dispatch = useAppDispatch();

  const onTabClick = async (url: string) => {
    // Open link in new tab
    if (settings.openURL === "new-tab") {
      await chrome.tabs.create({ url });
      return;
    } else if (settings.openURL === "background-tab") {
      await chrome.tabs.create({ url, active: false });
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
                    hideURL={settings.hideURL}
                    hideTime={settings.hideTime}
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
                  hideURL={settings.hideURL}
                  hideTime={settings.hideTime}
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
                      hideURL={settings.hideURL}
                      hideTime={settings.hideTime}
                      onRestoreClick={() => onRestoreClick(window.sessionId)}
                      onTabClick={onTabClick}
                    />
                  );

                // Session also contains tab {Other Tab (Tab form other device) will still have structure like window}
                return (
                  <TabItem
                    key={window.tabs[0].title}
                    title={window.tabs[0].title}
                    url={window.tabs[0].url}
                    hideURL={settings.hideURL}
                    hideTime={settings.hideTime}
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
