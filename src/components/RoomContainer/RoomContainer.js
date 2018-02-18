import React from 'react';
import PropTypes from 'prop-types';

import List from '../List/List';
import RoomItem from '../RoomItem/RoomItem';
import InputPrompt from '../InputPrompt/InputPrompt';

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
        this.roomList();
    }

    roomList() {
        const { socket } = this.context;
        socket.emit('rooms');
    }

    joinRoom(room, pass) {
        const { socket } = this.context;
        //const roomObj = this.state.rooms[room];
        const request = { room: room, pass: pass}
        socket.emit('joinroom', request, (status, reason) => {
            console.log(request, status, reason);
            // Parse request
        });
    }

    render() {
        let { rooms } = this.state;
        const roomNames = Object.keys(rooms);
        console.log(roomNames);
        return (
            <div>
                <InputPrompt label="Create new room" onSubmit={this.joinRoom.bind(this)} />
                <List className="">
                    {roomNames.map(name => (
                        <RoomItem 
                            key={name} 
                            name={name} 
                            locked={rooms[name].locked} 
                            onClick={this.joinRoom.bind(this)}
                        />
                    ))}
                </List>
            </div>
        )
    }
}

RoomContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default RoomContainer;