import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({key, name, admin}) => {
    let display = admin ? `@${name}` : name;
    return (
        <li key={key}>{display}</li>
    );
};

UserItem.propTypes = {
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    admin: PropTypes.bool
};

UserItem.defaultProps = {
    admin: false
};

export default UserItem;