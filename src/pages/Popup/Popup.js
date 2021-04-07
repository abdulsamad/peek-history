import { PopupProvider } from './context/popupContext';
import ThemeProvider from './components/layout/ThemeProvider';
import Navbar from './components/layout/Navbar';
import BottomNavbar from './components/layout/BottomNavbar';
import Home from './components/home/Home';

function Popup() {
  return (
    <PopupProvider>
      <ThemeProvider>
        <Navbar title='Peek History' />
        <Home />
        <BottomNavbar />
      </ThemeProvider>
    </PopupProvider>
  );
}

export default Popup;
