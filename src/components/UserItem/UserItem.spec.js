import React from 'react';
import UserItem from './UserItem.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

jest.useFakeTimers();

describe('UserItem tests', () => {    
    const user = "foo";
    let mockSocketServer, mockSocket, stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('op', (opObj, fn) => {
                if (opObj.user === user) {
                    fn(true);
                } else {
                    fn(false)
                }
            });
            socket.on('deop', (deopObj, fn) => {
                if (opObj.user === user) {
                    fn(true);
                } else {
                    fn(false)
                }
            });
            socket.on('ban', (banObj, fn) => {
                if (opObj.user === user) {
                    fn(true);
                } else {
                    fn(false)
                }
            });
            socket.on('kick', (kickObj, fn) => {
                if (opObj.user === user) {
                    fn(true);
                } else {
                    fn(false)
                }
            });
        });

        mockSocket = SocketIO.connect('http://localhost:3050');

        jest.runOnlyPendingTimers();
    });

    it('should not render without required name property', () => {
        shallow(<UserItem />, { context: { socket: mockSocket}});

        expect(stub.calledOnce).toBe(true);
    });

    it('should render provided name property', () => {
        const name = 'me';
        const component = shallow(<UserItem name={name} />);

        let text = component.find('li').first().find('span').first().text();

        expect(text).toEqual(name);
    });
    
    it('should render admin with @ prefix', () => {
        const name = 'me';
        const component = shallow(<UserItem name={name} admin={true} />);
    
        let text = component.find('li').first().find('span').first().text();
    
        expect(text).toEqual(`@${name}`);
    });

    afterEach(() => {
        console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});