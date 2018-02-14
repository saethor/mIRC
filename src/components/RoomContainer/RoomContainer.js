import React from 'react';
import PropTypes from 'prop-types';

import List from '../List/List';

class RoomContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: {}
        }
    }

    componentDidMount() {
        const { socket } = this.context;
        socket.on('roomlist', rooms => {
            this.setState({ rooms: rooms })
        });
    }

    roomList() {
        const { socket } = this.context;
        socket.emit('rooms');
    }

    joinRoom(room, pass) {
        const { socket } = this.context;
        const roomObj = this.state.rooms[room];
        const request = { room: room, pass: pass}
        socket.emit('joinroom', request, (status, reason) => {
            // Parse request
        });
    }

    render() {
        let { rooms } = this.state;
        const roomNames = Object.keys(rooms);
        return (
            <div>
                <List className="">
                    {roomNames.map(name => (
                        <li key={name}><h3>{name}</h3></li>
                    ))}
                </List>
            </div>
        )
    }
}


RoomContainer.propTypes = {

}

RoomContainer.defaultProps = { 

}

export default RoomContainer;