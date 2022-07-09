import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Preloader = () => (
  <Container>
    <CircularProgress />
  </Container>
);

export default Preloader;
