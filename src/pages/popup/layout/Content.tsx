import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";

import { ISettings } from "@src/commons/redux/settings/defaults";
import HistoryList from "./history/HistoryList";
import TabsList from "./tabs/TabsList";
import { RootState } from "../redux/store";
import { Active } from "../redux/ui/ui-slice";

const ContentContainer = styled("div")(() => ({
  height: "calc(100% - 56px)",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
}));

const Content = ({ settings }: { settings: ISettings }) => {
  const UIState = useSelector((state: RootState) => state.ui);

  return (
    <ContentContainer>
      {UIState.active === Active.HISTORY && <HistoryList settings={settings} />}
      {UIState.active === Active.TABS && <TabsList settings={settings} />}
    </ContentContainer>
  );
};

export default Content;
