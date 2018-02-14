import React from 'react';
import PropTypes from 'prop-types';
import List from '../List/List.js';
import MessageItem from '../MessageItem/MessageItem.js';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: this.props.messages
        };
    }
    render() {
        const { messages } = this.state;

        return (
            <div>
                <List>{
                    messages.map((message, index) => (
                        <MessageItem key={ index } message={ message } />
                    ))
                }</List>
            </div>
        );
    }
};

ChatWindow.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }))
};

ChatWindow.defaultProps = {
    messages: []
};

export default ChatWindow;