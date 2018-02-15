import React from 'react';
import PropTypes from 'prop-types';
import ChatWindow from '../ChatWindow/ChatWindow.js';
import MessageInput from '../MessageInput/MessageInput.js';

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }
    componentDidMount() {
        const { socket } = this.context;
        
        socket.on('updatechat', (roomName, history) => {
            if (this.props.room === roomName) {
                this.setState({
                    messages: history
                });
            }
        });
    }
    sendMessage(msg) {
        const { socket } = this.context;
        
        socket.emit('sendmsg', msg);
    }
    render() {
        const { messages } = this.state;
        return (
            <div>
                <ChatWindow messages={ messages } />
                <MessageInput onSend={ this.sendMessage } />
            </div>
        );
    }
};

ChatContainer.propTypes = {
    room: PropTypes.string
};

export default ChatContainer;