import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotificationItem = ({ title, link, unread, onClick}) => (
    <li className={`notification ${unread ? 'unread' : 'read'}`}>
        <Link to={link}>
            <span className="title">{title}</span>
        </Link>
        <button onClick={onClick}>
            {unread ? 'mark as read' : 'mark as unread'}
        </button>
    </li>
);

NotificationItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    unread: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default NotificationItem;