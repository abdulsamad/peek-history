import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface IMainContainer {
  children: React.ReactNode;
}

const MainContainer = ({ children }: IMainContainer) => {
  return <Container>{children}</Container>;
};

export default MainContainer;
