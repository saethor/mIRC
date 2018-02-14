import React from 'react';
import PropTypes from 'prop-types';

const RoomItem = ({ name, locked, onClick }) => (
    <ul onClick={() => onClick(name)}>
        <h3>{name}</h3>
        <i>{locked}</i>
    </ul>
);

RoomItem.defaultProps = {
    locked: false
}

RoomItem.propTypes = {
    name: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

export default RoomItem;