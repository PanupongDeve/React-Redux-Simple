import Chat from 'twilio-chat';

export default class TwiloChatClient {
    constructor(token, channelName, identity) {
        this.chatClient = new Chat(token);
        this.identity = identity;
        this.channelName = channelName;
        this.channel;
    }

    initChat = async () => {
        await this.chatClient.initialize();
        await this.connectChannel();
    }

    connectChannel = async () => {
        try {
            this.channel = await this.chatClient.getChannelByUniqueName(this.channelName);
            await this.channel.join();
        } catch (error) {
          if(error && error.bdoy && error.body.code === 50300) {
            this.channel = this.chatClient.createChannel({
                uniqueName: this.channelName
            });
          } else if(error && error.message === 'Member already exists') {
              this.channel = this.channel;
          }
        }  
    }

    reciveMessages = async (functionReciveMessagePage) => {
        const messagesPage = await this.channel.getMessages();
        let messages = messagesPage.items;
        messages = messages.map(message => this.setFormat(message));
        functionReciveMessagePage(messages);
    }

    connectSocketMessage = (roomName, functionReciveMessage) => {
        this.channel.on(roomName, functionReciveMessage);
    }

    sendMessage = (message) => {
        this.channel.sendMessage(message);
    }

    setFormat = (message) => {
        const { author, body } = message.state;
        return {
            me: this.identity === author,
            author: author,
            body
        }
    }
}

