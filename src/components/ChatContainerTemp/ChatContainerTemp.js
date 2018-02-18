import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow.js';
import MessageInput from '../MessageInput/MessageInput.js';
import UserList from '../UserList/UserList.js';

class ChatContainerTemp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                nick: 'aub',
                timestamp: 'today',
                message: 'some message :|'
            }],
            users: {
                aub: 'aub'
            },
            ops: {fop: 'fop'},
            status: false
        };
    }
    sendMessage(msg) { console.log(msg) }
    render() {
        const { ops, users, messages } = this.state;
        const { room } = this.props;

        return (
            <div className="chat-container">
                <div className="chat-window-wrapper">
                    <ChatWindow messages={ messages } />
                    <UserList ops={ ops } users={ users } room={ room } />
                </div>
                <MessageInput onSend={ (msg) => this.sendMessage(msg) } />
            </div>
        );
    }
};

export default ChatContainerTemp;