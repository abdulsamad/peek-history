import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import HistoryList from "./history/HistoryList";
import TabsList from "./tabs/TabsList";
import { RootState } from "../redux/store";
import { Active } from "../redux/ui/ui-slice";

const ContentContainer = styled.div`
  height: calc(100% - 56px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = () => {
  const UIState = useSelector((state: RootState) => state.ui);

  return (
    <ContentContainer>
      {UIState.active === Active.HISTORY && <HistoryList />}
      {UIState.active === Active.TABS && <TabsList />}
    </ContentContainer>
  );
};

export default Content;
