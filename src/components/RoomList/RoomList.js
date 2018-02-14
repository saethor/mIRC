import React from 'react';
import { PropTypes } from 'prop-types';

const RoomList = ({ rooms }) => {
    rooms = rooms || [];
    return (
        <ul>
            {rooms.map((room, index) => (
                <li key={index}>
                    <h3>{room}</h3>
                </li>
            ))}
        </ul>
    )
}

RoomList.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RoomList;