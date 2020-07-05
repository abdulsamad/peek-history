import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './css/Popup.css';

render(<Popup />, window.document.querySelector('#app-container'));
