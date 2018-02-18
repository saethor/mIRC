import React from 'react';
import PropTypes from 'prop-types';

const ChatWindow = ({messages}) => {
    return (
        <div className="chat-window">
            <ul className="chat-messages">{
                messages.map((messageObj, index) => {
                    const { nick, timestamp, message } = messageObj; 
                    
                    return (
                        <li className="chat-message" key={ index } >
                            { `<${new Date(timestamp).toString().substr(4, 20)}> ${nick}: ${message}` }
                        </li>
                    );      
                })
            }</ul>
        </div>
    );
} 

ChatWindow.propTypes = {
    messages: PropTypes.array
};

ChatWindow.defaultProps = {
    messages: []
};

export default ChatWindow;