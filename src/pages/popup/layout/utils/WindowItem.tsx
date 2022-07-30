import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  List,
  Tooltip,
  styled,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Launch as LauchIcon,
} from "@mui/icons-material";

import { ITabItem, IWindowItem } from "../../redux/tabs/tabs-slice";
import TabItem from "./ListItem";

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  ".MuiAccordionSummary-content": {
    flexBasis: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

const WindowItem = ({
  window,
  onRestoreClick,
  onTabClick,
  hideURL,
  hideTime,
}: {
  window: IWindowItem;
  onRestoreClick: () => void;
  onTabClick: (url: string) => void;
  hideURL: boolean;
  hideTime: boolean;
}) => {
  const { tabs, sessionId } = window;

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Window on Other Device"
        sx={{ flexBasis: "100%", justifyContent: "space-between" }}
        data-window-item
      >
        <Typography>
          Window &#40;{`${tabs.length} ${tabs.length > 1 ? "Tabs" : "Tab"}`}
          &#41;
        </Typography>
        <Tooltip title="Restore Window" placement="top">
          <IconButton
            size="small"
            color="primary"
            sx={{ marginLeft: "6px" }}
            onClick={(ev) => {
              ev.stopPropagation();
              onRestoreClick();
            }}
          >
            <LauchIcon />
          </IconButton>
        </Tooltip>
      </StyledAccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <List
          key={sessionId}
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
          aria-label="Tab on other device"
        >
          {tabs.map((tab: ITabItem) => (
            <TabItem
              key={tab.title}
              title={tab.title}
              url={tab.url}
              hideURL={hideURL}
              hideTime={hideTime}
              onClick={() => onTabClick(tab.url)}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default WindowItem;
