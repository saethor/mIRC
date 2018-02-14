import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({name, admin}) => {
    let display = admin ? `@${name}` : name;
    return (
        <li>{display}</li>
    );
};

UserItem.propTypes = {
    name: PropTypes.string.isRequired,
    admin: PropTypes.bool
};

UserItem.defaultProps = {
    admin: false
};

export default UserItem;