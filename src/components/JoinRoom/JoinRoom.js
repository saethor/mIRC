import React from 'react';
import PropTypes from 'prop-types';
import InputPrompt from '../InputPrompt/InputPrompt'

const JoinRoom = ({ name, onSubmit }) => (
    <div className="room">
        <h3 className="room__name">{name}</h3>
        <InputPrompt label="Password..." onSubmit={onSubmit} />
    </div>
)

JoinRoom.propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default JoinRoom;