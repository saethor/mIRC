import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = (message) => {
    const {date, user, text} = message;
    return (
        <p>{ `${date} ${user} ${text}` }</p>
    );
};

MessageItem.propTypes = {
    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};

export default MessageItem;