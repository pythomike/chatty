import React, {Component} from 'react';

class Message extends Component {
    
    render() {
           if (this.props.type === "incomingMessage") {
                console.log("a message",this.props.type)
                return (
                <div className="message">
                    <span className="message-username">{this.props.username}</span>
                    <span className="message-content">{this.props.msg}</span>
                </div>
               );
            } else {
                console.log("a username",this.props.type)
                return (
                <span className="message system">{this.props.content}</span>
                );
            }
    }
}
export default Message;