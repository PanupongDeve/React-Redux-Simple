import React, { Component } from "react";


export default class CloundFireStoreTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentDidMount() {


  }



  onChange = (event) => {
    const { name, value } = event.target;
  
    this.setState({ 
        [name]: value
    });
  }

   onSubmit = async (event) => {
    event.preventDefault();
    const data = {
        username: this.state.username
    }

  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <form onSubmit={this.onSubmit}>
          <input teype="text" name="username" value={this.state.username} onChange={this.onChange} />
          <button>send</button>
        </form>
      </div>
    );
  }
}
