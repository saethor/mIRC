import React from 'react';
import PropTypes from 'prop-types';
import ChatWindow from '../ChatWindow/ChatWindow.js';
import MessageInput from '../MessageInput/MessageInput.js';
import UserList from '../UserList/UserList.js';

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            users: {},
            ops: {},
            status: false
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

        socket.on('updateusers', (roomName, users, ops) => {
            if (this.props.room === roomName) {
                this.setState({
                    users: users,
                    ops: ops
                });
            }
        });

        socket.emit('joinroom', {room: this.props.room}, (status) => {
            this.setState({
                status: status
            });
        });
    }
    sendMessage(msg) {
        const { socket } = this.context;
        const { privateMsg } = this.props;

        if (privateMsg) {
            socket.emit('privatemsg', {
                nick: this.props.room,
                message: msg
            }, (res) => console.log(res));
        } else {
            socket.emit('sendmsg', {
                roomName: this.props.room,
                msg: msg
            });
        }
    }
    render() {
        const { ops, users, messages } = this.state;
        const { room } = this.props;

        return (
            <div>
                <ChatWindow messages={ messages } />
                <UserList ops={ ops } users={ users } room={ room } />
                <MessageInput onSend={ (msg) => this.sendMessage(msg) } />
            </div>
        );
    }
};

ChatContainer.propTypes = {
    room: PropTypes.string,
    privateMsg: PropTypes.bool
};

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};

ChatContainer.defaultProps = {
    privateMsg: false
}

export default ChatContainer;