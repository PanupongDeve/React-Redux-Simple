import React, { Component } from "react";
import model from '../../class/SocketClient';

export default class CloundFireStoreTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  async componentDidMount() {
    const reciveData = (data) => {
      console.log(data);
    }
    await model.owner.getAll(reciveData);
    await model.owner.update({
      id: '3',
      data: {
        firstName: 'Testerr',
        lastName: 'TestBy'
      }
    })
    // await model.owner.getAllWithSocket(reciveData, true);
    // await model.owner.post({
    //   fistName: 'Tester',
    //   lastName: 'tester'
    // });

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
