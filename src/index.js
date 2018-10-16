import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CloundDiary from './class/CloundDiary';

import 'react-toastify/dist/ReactToastify.css';

import Redux from './Redux';
import RouterHelper from './Router';
import FirebaseHelper from './class/FirebaseHelper';
// CloundDiary.getImage('1200px-Francois_Auguste_Biard_-_Fight_with_Polar_Bears.jpg');

const store = Redux.generateStore();
const Provider = Redux.getProvider();
const Router = RouterHelper.getRoutesComponent();
FirebaseHelper.plugin();

class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <Router />
        </Provider>
      );
    }
  }

ReactDOM.render( <Root />, document.getElementById('root'));
registerServiceWorker();
