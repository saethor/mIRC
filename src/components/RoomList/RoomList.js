import React from 'react';
import { PropTypes } from 'prop-types';

const RoomList = ({ rooms }) => {
    rooms = rooms || [];
    return (
        <ul>
            {rooms.map(room => (
                <li key={room.name}>
                    <h3>{room.name}</h3>
                </li>
            ))}
        </ul>
    )
}

RoomList.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RoomList;