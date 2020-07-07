import React from 'react';
import Navbar from './components/layout/Navbar';
import BottomNavbar from './components/layout/BottomNavbar';
import PopupState from './context/popupState';
import Home from './components/home/Home';

const Popup = () => {
  return (
    <PopupState>
      <div className="App">
        <Navbar title="Peek History" />
        <Home />
        <BottomNavbar />
      </div>
    </PopupState>
  );
};

export default Popup;
