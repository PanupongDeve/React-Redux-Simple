import React, { Component } from "react";
import model from "../../class/FirebaseCloundFireStore";

export default class CloundFireStoreTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  async componentDidMount() {
    const data = await model.user.getAll();
    await model.user.getLastKey();
    
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

    await model.user.create(data);
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