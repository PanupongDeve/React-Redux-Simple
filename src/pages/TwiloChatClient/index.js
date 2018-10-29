import React, { Component } from 'react'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import './App.css'
import model from '../../class/ServicesAPI';
import TwiloChatClient from '../../class/TwiloChatClient';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.identity = "panupong";
  }

  async componentDidMount() {
    const data = await model.twlio.post({
      device: "browser",
      identity: this.identity,
    });

    this.chatClient = new TwiloChatClient(data.result.token, 'general', this.identity);
    await this.chatClient.initChat();
    await this.chatClient.reciveMessages(this.reciveMessagesPage);
    await this.chatClient.connectSocketMessage('messageAdded', this.messageAdded);
    
  };

  messageAdded = message => {
    message = this.chatClient.setFormat(message);
    this.setState((prevState, props) => ({
      messages: [...prevState.messages, message]
    }));
  };

  reciveMessagesPage = (messages) => {
    this.setState({ messages })
  }

  handleNewMessage = async (text) => {
    await this.chatClient.sendMessage(text);
  }

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

export default App
