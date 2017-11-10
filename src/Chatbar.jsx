import React, {Component} from 'react';

class Chatbar extends Component{

constructor(props){
    super(props);
    this.state = {
        content: " "
    }    
}

handleMessage = (event) => {
    if (event.key === 'Enter') {
        this.props.sendMessage(event.target.value)
    event.target.value = ""
    }
}

handleUser = (event) => {
    if (event.key === 'Enter') {
        this.props.sendUser(event.target.value)
    }
}

    render() {
        // console.log("Rendering <Chatbar/>")
        return (
            <footer className="chatbar">
                <input className="chatbar-username" onKeyPress={ this.handleUser } placeholder="Your Name (Optional)"/>
                <input className="chatbar-message" onKeyPress={ this.handleMessage } placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default Chatbar;