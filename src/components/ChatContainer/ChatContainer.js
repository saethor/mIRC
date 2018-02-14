import React from 'react';
// import PropTypes from 'prop-types';
// import List from '../List/List.js';
import ChatWindow from '../ChatWindow/ChatWindow.js';
import MessageInput from '../MessageInput/MessageInput.js';

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }
    sendMessage(msg) {
        // Do send message in socket
        console.log(msg);
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

export default ChatContainer;