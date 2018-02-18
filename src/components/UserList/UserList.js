import React from 'react';
import PropTypes from 'prop-types';
import UserItem from '../UserItem/UserItem.js';

const UserList = ({ ops, users, room }) => {
    let key = 0;
    
    return (
        <ul className="user-list">
            {Object.keys(ops).map(op => (
                <UserItem key={key++} name={op} admin={true} room={room} />
            ))}
            {Object.keys(users).map(user => (
                <UserItem key={key++} name={user} room={room} />
            ))}
        </ul>
    )
}

UserList.propTypes = {
    ops: PropTypes.object,
    users: PropTypes.object,
    room: PropTypes.string.isRequired,
};

UserList.defaultProps = {
    ops: {},
    users: {}
};

export default UserList