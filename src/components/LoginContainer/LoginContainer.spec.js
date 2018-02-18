import React from 'react';
import LoginContainer from './LoginContainer.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

jest.useFakeTimers();

describe('LoginContainer tests', () => {
    let validUser = 'user';
    let mockSocketServer, mockSocket, stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');

        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('adduser', function(username, fn){
                if (username == validUser) {
                    fn(true);
                } else {
                    fn(false);
                }
            })
        });

        mockSocket = SocketIO.connect('http://localhost:3050');

        jest.runOnlyPendingTimers();
    });

    it('doesn\'t update its validUser state if invalid user', () => {
        const component = shallow(<LoginContainer />, {context: {socket: mockSocket}});

        component.instance().onLogin('someone');

        expect(component.instance().state.validUser).toBe(false);
    });

    it('updates the logged in user if valid user', () => {
        const component = shallow(<LoginContainer />, {context: {socket: mockSocket}});

        component.instance().onLogin(validUser);

        expect(component.instance().state.validUser).toBe(true);
    });

    afterEach(() => {
        console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});