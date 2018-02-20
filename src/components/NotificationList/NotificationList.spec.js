import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

import NotificationList from './NotificationList';

jest.useFakeTimers();

describe('NotificationList tests', () => {
    let mockSocketServer, mockSocket //, stub;
    
    beforeEach(() => {
        //stub = sinon.stub(console, 'error');
        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            
        });

        mockSocket = SocketIO.connect('http://localhost:3050');

        jest.runOnlyPendingTimers();
    });

    it('should add notification to state when emited', () => {
        const component = shallow(<NotificationList />, { context: { socket: mockSocket} });

        mockSocketServer.emit('recv_privatemsg', 'foo', 'bar');
        component.update();

        expect(component.instance().state.notifications.length).toBe(1);
    })

    it('should mark notification as read', () => {
        const component = shallow(<NotificationList />, { context: { socket: mockSocket } });

        mockSocketServer.emit('recv_privatemsg', 'foo', 'bar');
        component.instance().toggleRead(component.instance().state.notifications[0]);

        expect(component.instance().state.notifications[0].unread).toBe(false);
    });

    it('should mark notification as unread', () => {
        const component = shallow(<NotificationList />, { context: { socket: mockSocket } });

        mockSocketServer.emit('recv_privatemsg', 'foo', 'bar');
        component.instance().toggleRead(component.instance().state.notifications[0]);
        component.instance().toggleRead(component.instance().state.notifications[0]);

        expect(component.instance().state.notifications[0].unread).toBe(true);
    });

    afterEach(() => {
        //console.error.restore();
        mockSocketServer.stop();
        mockSocket.close();
    });
});