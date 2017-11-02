import React, {Component} from 'react';

class Chatbar extends Component{

constructor(props){
    super(props);
    this.state = {
        content: " "
    }    
}



handleKeyPress = (event) => {
    let id = Math.random()
    if (event.key === 'Enter') {

    this.props.addMessage(id, event.target.value)
    event.target.value = ""
    }
}

    render() {
        console.log("Rendering <Chatbar/>")
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
                <input className="chatbar-message" onKeyPress={ this.handleKeyPress } placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default Chatbar;