import { OptionsProvider } from './context/optionsContext';
import ThemeProvider from './components/layout/ThemeProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Settings from './components/settings/Settings';

function Options() {
  return (
    <OptionsProvider>
      <ThemeProvider>
        <Navbar title='Peek History' />
        <Settings />
        <Footer title='Peek History' />
      </ThemeProvider>
    </OptionsProvider>
  );
}

export default Options;
