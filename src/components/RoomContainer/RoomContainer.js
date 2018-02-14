import React from 'react';

import List from '../List/List';
import RoomItem from '../RoomItem/RoomItem';

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
        //const roomObj = this.state.rooms[room];
        const request = { room: room, pass: pass}
        socket.emit('joinroom', request, (status, reason) => {
            // Parse request
            console.debug(reason);
        });
    }

    render() {
        let { rooms } = this.state;
        const roomNames = Object.keys(rooms);
        return (
            <div>
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

export default RoomContainer;