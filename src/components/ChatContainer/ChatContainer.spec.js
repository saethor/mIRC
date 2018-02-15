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

    it('should receive updatechat signal after sending a new message', () => {
        const msg = 'hello';
        const component = shallow(<ChatContainer room={room} />, {context: { socket: mockSocket} });

        component.instance().sendMessage(msg);

        expect(component.instance().state.messages).toHaveLength(1);
        expect(component.instance().state.messages[0]).toEqual(msg);
    });

    afterEach(() => {
        console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});
