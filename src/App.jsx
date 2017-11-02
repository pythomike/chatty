import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.addMessage = this.addMessage.bind(this);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }
  


addMessage(id, content) {
    const newMessage = {id: id, username: this.state.currentUser.name, content: content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
}


  render() {
    console.log("Rendering <App/>")
    console.log(this)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Spambot 9000</a>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <Chatbar currentUser=
         {this.state.currentUser}
         addMessage= {this.addMessage}
         /> 
      </div>
        );
        
      }
    }
export default App;
