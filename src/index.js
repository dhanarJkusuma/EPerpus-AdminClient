import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import Store from './store';
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';


ReactDOM.render(
  <MuiPickersUtilsProvider
    utils={MomentUtils}
    moment={moment}
    locale="en">
  <Provider store={Store}>
    <App/>
  </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root'));

registerServiceWorker();
