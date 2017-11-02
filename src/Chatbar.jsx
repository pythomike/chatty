import React, {Component} from 'react';

class Chatbar extends Component{

constructor(props){
    super(props);
    this.state = {
        content: " "
    }    
}



handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
    // this.setState({
    //    content: event.target.value    
    // })
    this.props.addMessage(4, event.target.value)
    return event.target.value
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