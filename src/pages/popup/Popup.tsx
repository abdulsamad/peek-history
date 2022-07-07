import { useEffect } from "react";
import { Provider } from "react-redux";

import store from "./redux/store";

import Navbar from "./layout/Navbar";
import BottomNavBar from "./layout/BottomNavbar";
import MainContainer from "./layout/utils/MainContainer";
import Content from "./layout/Content";

const Popup = () => {
  useEffect(() => {
    //
  }, []);

  return (
    <Provider store={store}>
      <MainContainer>
        <Navbar title="Peek History" />
        <Content />
        <BottomNavBar />
      </MainContainer>
    </Provider>
  );
};

export default Popup;
