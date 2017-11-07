import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, 
      messages: []
    }
  }

// CONNECT TO SOCKET/LISTEN FOR MESSAGE
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', event => {
      const insertMsg = this.state.messages.concat(JSON.parse(event.data));
      this.setState({messages:insertMsg})
         console.log(this.state.messages)
    });
  }

// SEND MESSAGE TO SERVER
  sendMessage(id, content) {
    const newMessage = {id: id, username: this.state.currentUser.name, content: content};
    this.socket.send(JSON.stringify(newMessage))
  }

  render() {
    console.log("Rendering <App/>")
    //console.log(this)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chat.ty</a>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <Chatbar currentUser=
        {this.state.currentUser}
        sendMessage= {this.sendMessage}
        /> 
      </div>
    );  
  }
}
export default App;
