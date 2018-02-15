import React from 'react';
import ChatContainer from './ChatContainer.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

jest.useFakeTimers();

describe('ChatContainer tests', () => {
    const room = 'foo';
    let mockSocketServer, mockSocket, stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');

        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('sendmsg', (msg) => {
                socket.emit('updatechat', room, [msg], msg);
            });
        });

        mockSocket = SocketIO.connect('http://localhost:3050');

        jest.runOnlyPendingTimers();
    });

    it('should render', () => {
        shallow(<ChatContainer />, {context: { socket: mockSocket} });

        expect(stub.notCalled).toBe(true);
    });

    it('should not update its messages state if not proper room prop set', () => {
        const component = shallow(<ChatContainer />, {context: { socket: mockSocket} });

        component.instance().sendMessage('fop');

        expect(component.instance().state.messages).toHaveLength(0);
    });

    it('should update its messages state when receving an updatechat signal', () => {
        const msg = 'fop';
        const component = shallow(<ChatContainer room={room} />, {context: { socket: mockSocket} });

        mockSocketServer.emit('updatechat', room, [msg], msg);

        expect(component.instance().state.messages).toHaveLength(1);
        expect(component.instance().state.messages[0]).toEqual(msg);
    });

    it('should update its message state after sending a new message', () => {
        const msg = 'hello';
        const component = shallow(<ChatContainer room={room} />, {context: { socket: mockSocket} });

        component.instance().sendMessage(msg);

        expect(component.instance().state.messages).toHaveLength(1);
        expect(component.instance().state.messages[0]).toEqual(msg);
    });

    it('should not update its users state after updateusers signal if room doesnt match', () => {
        const component = shallow(<ChatContainer />, {context: { socket: mockSocket} });

        mockSocketServer.emit('updateusers', room, {name: 'foo'}, {});

        expect(component.instance().state.users).toEqual({});
    });

    it('should not update its ops state after updateusers signal if room doesnt match', () => {
        const component = shallow(<ChatContainer />, {context: { socket: mockSocket} });

        mockSocketServer.emit('updateusers', room, {}, {name: 'foo'});

        expect(component.instance().state.ops).toEqual({});
    });

    it('should update its users state after receiving an updateusers signal if room matches', () => {
        const users = {name: 'foo'};
        const component = shallow(<ChatContainer room={room} />, {context: { socket: mockSocket} });

        mockSocketServer.emit('updateusers', room, users, {});

        expect(component.instance().state.users).toEqual(users);
    });

    it('should update its ops state after receiving an updateusers signal if room matches', () => {
        const ops = {name: 'foo'};
        const component = shallow(<ChatContainer room={room} />, {context: { socket: mockSocket} });

        mockSocketServer.emit('updateusers', room, {}, ops);

        expect(component.instance().state.ops).toEqual(ops);
    });

    afterEach(() => {
        console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});
