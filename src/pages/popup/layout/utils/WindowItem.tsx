import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  styled,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { ITabItem, IWindowItem } from "../../redux/tabs/tabs-slice";
import TabItem from "./ListItem";

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  ".MuiAccordionSummary-content": {
    flexBasis: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const WindowItem = ({
  window,
  onRestoreClick,
  onTabClick,
  hideURL,
}: {
  window: IWindowItem;
  onRestoreClick: () => void;
  onTabClick: (url: string) => void;
  hideURL: boolean;
}) => {
  const { tabs, sessionId } = window;

  return (
    <Accordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Window on Other Device"
        sx={{ flexBasis: "100%", justifyContent: "space-between" }}
      >
        <Typography>
          Window &#40;{`${tabs.length} ${tabs.length > 1 ? "Tabs" : "Tab"}`}
          &#41;
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={(ev) => {
            ev.stopPropagation();
            onRestoreClick();
          }}
        >
          Restore
        </Button>
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
              onClick={() => onTabClick(tab.url)}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default WindowItem;
