import React from 'react';
import PropTypes from 'prop-types';
import UserItem from '../UserItem/UserItem.js';

const UserList = ({ ops, users }) => {
    let key = 0;
    
    return (
        <ul>
            {Object.keys(ops).map(op => (
                <UserItem key={key++} name={op} admin={true} />
            ))}
            {Object.keys(users).map(user => (
                <UserItem key={key++} name={user} />
            ))}
        </ul>
    )
}

UserList.propTypes = {
    ops: PropTypes.object,
    users: PropTypes.object
};

UserList.defaultProps = {
    ops: {},
    users: {}
};

export default UserList