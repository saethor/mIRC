import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

import RoomContainer from './RoomContainer';

jest.useFakeTimers();

describe('RoomContainer test', () => {
    let mockSocketServer, mockSocket //, stub;

    beforeEach(() => {
        //stub = sinon.stub(console, 'error');
        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('rooms', () => {
                const rooms = {
                    'General': {
                        locked: false,
                        password: ''
                    },
                    'CatGifs': {
                        locked: true,
                        password: 'hunter2'
                    }
                }
                socket.emit('roomlist', rooms);
            });
        });

        mockSocket = SocketIO.connect('http://localhost:3050');

        jest.runOnlyPendingTimers();
    });

    it('should update state with rooms when called roomList', () => {
        const component = shallow(<RoomContainer />, { context: { socket: mockSocket } });
        component.instance().roomList();
        expect(Object.keys(component.state().rooms).length).toEqual(2);
    });

    afterEach(() => {
        //console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});