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

    joinRoom(room) {
        const { router } = this.context;
        //const roomObj = this.state.rooms[room];
        router.history.push(`/rooms/${room}`)
    }

    render() {
        let { rooms } = this.state;
        const roomNames = Object.keys(rooms);
        return (
            <div className="room-container">
                <h2 className="room-header">Available rooms</h2>
                <div className="room-control">
                    <InputPrompt label="Create new room" onSubmit={this.joinRoom.bind(this)} />
                    <button className="btn" onClick={this.roomList.bind(this)}>refresh</button>
                </div>
                <List className="room-list">
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
    socket: PropTypes.object.isRequired,
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default RoomContainer;