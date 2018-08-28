import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Redux from '../../model/Redux';
import languageHelper from '../../model/languageHelper';
import ToastContainer from '../../components/ToastContainer';
import * as LangActions from '../../model/Redux/actions/LangActions';
import text from './App.text';

const connect = Redux.getConnect();

class App extends Component {
  onClick = () => {
    this.props.notify.success("Hello World");
  }

  onSwitchLang = (lang) => {
    this.props.switchLang(lang);
  } 

  render() {

    const text_switched = languageHelper.switchLang(text);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{text_switched.title}</h1>
        </header>
        <p onClick={this.onClick} className="App-intro">
          {text_switched.intro1} <code>src/App.js</code> {text_switched.intro2}
        </p>
        <button onClick = { () => this.onSwitchLang('en')}>EN</button>
        <button onClick = { () => this.onSwitchLang('th')}>TH</button>
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

export default connect(mapStateToProps, LangActions)(App);
