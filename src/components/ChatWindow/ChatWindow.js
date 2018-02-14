import React from 'react';
import PropTypes from 'prop-types';

const ChatWindow = ({messages}) => {
    return (
        <div>
            <ul>{
                messages.map((messageObj, index) => {
                    const { nick, timestamp, message } = messageObj; 
                    
                    return (
                        <li key={ index }>{ `${nick} ${timestamp} ${message}` }</li>
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