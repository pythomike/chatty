import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.state = {
      currentUser: {name: "Anon"}, 
      messages: [],
      type: "postNotification",
      users: 0
    }
  }

// CONNECT TO SOCKET/LISTEN FOR MESSAGE
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', event => {
      let data = JSON.parse(event.data)
      console.log("FROM SERVER", data)

      this.state.messages.push(data);
      this.setState({
        users: data.users
      })

      if (data.type === "incomingMessage"){
        this.setState({
          type: "postMessage"
          })
      } else {
        this.setState({
          type: "postNotification"
        })
      }
    });
    
  }

  sendMessage(content) {
    const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: content};
    this.socket.send(JSON.stringify(newMessage))
  }

  sendUser(username){
    if (username != this.state.currentUser.name){
      const content = this.state.currentUser.name + " changed their name to " + username
      const userUpdate = {type: "postNotification", content: content }
      
      this.setState({currentUser: {name:username}})
      this.socket.send(JSON.stringify(userUpdate))
    } else { 
     // console.log("We good")
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chat.ty</a>
          <div className="user-count">Users Online: {this.state.users}</div>

        </nav>
        <MessageList messages= {this.state.messages}
        type= {this.state.type}
        content= {this.state.content} 
        />
        <Chatbar currentUser={this.state.currentUser}
        sendMessage= {this.sendMessage}
        sendUser= {this.sendUser}
        
        /> 
      </div>
    );  
  }
}
export default App;
