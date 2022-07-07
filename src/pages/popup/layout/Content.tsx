import React from "react";
import styled from "@emotion/styled";

import HistoryList from "./history/HistoryList";

const ContentContainer = styled.div`
  height: calc(100% - 56px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = () => {
  return (
    <ContentContainer>
      <HistoryList />
    </ContentContainer>
  );
};

export default Content;
