import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const RoomItem = ({ name }) => (
    <li onClick={() => onClick(name)}>
        <Link to={`/rooms/${name}`}>{name}</Link>
    </li>
);

RoomItem.propTypes = {
    name: PropTypes.string.isRequired,
}

export default RoomItem;