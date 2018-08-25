import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import 'react-toastify/dist/ReactToastify.css';
import Redux from './model/Redux';
import RouterHelper from './model/Router';

const store = Redux.generateStore();
const Provider = Redux.getProvider();
const Router = RouterHelper.getRoutesComponent();

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
