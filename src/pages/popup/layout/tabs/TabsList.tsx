import React from "react";
import {
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Accordion } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { ISettings } from "@src/commons/redux/settings/defaults";
import TabItem from "../utils/ListItem";
import WindowItem from "../utils/WindowItem";
import { RootState, useAppDispatch } from "../../redux/store";
import { restoreSession } from "../../redux/tabs/thunks";
import { onURLClick } from "../../hooks/utils";

const TabsList = ({
  settings,
  tabs,
}: {
  settings: ISettings;
  tabs: RootState["tabs"];
}) => {
  const dispatch = useAppDispatch();

  const onRestoreClick = async (id: string) => {
    await dispatch(restoreSession(id));
  };

  return (
    <div>
      {/* Recently Closed Tabs */}
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} data-tabs-accordion>
          <Typography>Recently Closed Tabs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List aria-label="Recently Closed Tabs">
            {tabs.recent.length === 0 && (
              <ListItem>
                <Typography variant="h5">No recent tabs found.</Typography>
              </ListItem>
            )}
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
                    onTabClick={(url) => onURLClick(url, settings.openURL)}
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
                  onClick={() => onRestoreClick(tab.sessionId)}
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />} data-tabs-accordion>
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
                      onTabClick={(url) => onURLClick(url, settings.openURL)}
                    />
                  );

                // Session contains tab {Other Tab (Tab form other device) will still have structure like window}
                return (
                  <TabItem
                    key={window.tabs[0].title}
                    title={window.tabs[0].title}
                    url={window.tabs[0].url}
                    hideURL={settings.hideURL}
                    hideTime={settings.hideTime}
                    onClick={() => onRestoreClick(window.tabs[0].sessionId)}
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
