import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Redux from '../../model/Redux';
import ToastContainer from '../../components/ToastContainer';

const connect = Redux.getConnect();

class App extends Component {
  onClick = () => {

    this.props.notify.success("Hello World");
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p onClick={this.onClick} className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notify: state.notify,
    catStore: state.catStore
  }
}

export default connect(mapStateToProps)(App);
