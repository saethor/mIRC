import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

import JoinRoom from './JoinRoom';

jest.useFakeTimers();

describe('JoinRoom test', () => {
    let mockSocketServer, mockSocket, stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('joinroom', (joinObj, fn) => {
                var room = joinObj.room;
                var pass = joinObj.pass;
                var accepted = true;
                if (pass == 'hunter2') {
                    fn(true);
                }
                else if (pass == 'banned') {
                    fn(false, 'banned');
                }
                else {
                    fn(false, 'wrong password');
                }
            });
        });

        mockSocket = SocketIO.connect("http://localhost:3050");

        jest.runOnlyPendingTimers();
    });

    it('should render the title of the room', () => {
        const component = shallow(<JoinRoom name="General" />);
        expect(component.find('h3').first().text()).toEqual('General');
    })

    it('should render correctly when receiving correct prop', () => {
        const component = shallow(<JoinRoom name="" />);
        expect(stub.notCalled).toBe(true);
    });

    it('should not render correctly when not receiving all required props', () =>  {
        const component = shallow(<JoinRoom  />, { context: { socket: mockSocket } } );
        expect(stub.called).toBe(true);
    });

    it('should emit true when joining room', () => {
        const password = "hunter2", room = "asdf";
        const component = shallow(<JoinRoom name={room} />, { context: { socket: mockSocket } } );

        component.instance().join(password);

        expect(component.state().room).toBe(room);
        expect(component.state().feedback).toBe(undefined);
    });

    it('should provide reason when failing to join room', () => {
        const password = "password", room = "asdf";
        const component = shallow(<JoinRoom name={room} />, { context: { socket: mockSocket } });

        component.instance().join(password);

        expect(component.state().room).toBe(room);
        expect(component.state().feedback).toBe("wrong password");
    });

    it('should return banned when user is banned', () => {
        const password = "banned", room = "asdf";
        const component = shallow(<JoinRoom name={room} />, { context: { socket: mockSocket } });

        component.instance().join(password);

        expect(component.state().room).toBe(room);
        expect(component.state().feedback).toBe("banned");
    })

    afterEach(() => {
        console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});