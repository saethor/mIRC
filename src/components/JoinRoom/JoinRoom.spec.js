import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SocketIO, Server } from 'mock-socket';

import JoinRoom from './JoinRoom';

jest.useFakeTimers();

describe('JoinRoom test', () => {
    let mockSocketServer, mockSocket, error, log;

    beforeEach(() => {
        error = sinon.stub(console, 'error');
        log = sinon.stub(console, 'log');
        mockSocketServer = new Server('http://localhost:3050');
        mockSocketServer.on('connection', socket =>  {
            socket.on('joinRoom', (joinObj, fn) => {
                var room = joinObj.room;
                var pass = joinObj.pass;
                var accepted = true;
            });
        });

        mockSocket = SocketIO.connect("http://localhost:3050");

        jest.runOnlyPendingTimers();
    });

    it('should render the title of the room', () => {
        const component = shallow(<JoinRoom name="General" onSubmit={() => console.log(true)} />);
        expect(component.find('h3').first().text()).toEqual('General');
    })

    it('should render correctly when receiving correct prop', () => {
        const component = shallow(<JoinRoom name="" onSubmit={() => console.log()} />);
        expect(error.notCalled).toBe(true);
    });

    it('should not render correctly when not receiving all required props', () =>  {
        const component = shallow(<JoinRoom name="" />);
        expect(error.called).toBe(true);
    })

    afterEach(() => {
        console.error.restore();
        console.log.restore();        
        mockSocketServer.stop();
        mockSocket.close();
    });
});