import React from 'react';
import ChatWindow from './ChatWindow.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('ChatWindow tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error'); 
    });

    it('should render without messages prop', () => {
        shallow(<ChatWindow />);

        expect(stub.notCalled).toBe(true);
    });

    it('should render one message', () => {
        const msg = {
            nick: 'me',
            timestamp: new Date(),
            message: 'msg'
        };

        const component = shallow(<ChatWindow messages={[msg]} />);

        expect(stub.notCalled).toBe(true);
    });

    it('should render multiple messages', () => {
        const msg = {
            nick: 'me',
            timestamp: new Date(),
            message: 'msg'
        };
        const msg2 = {
            nick: 'me',
            timestamp: new Date(),
            message: 'msg2'
        };
        const component = shallow(<ChatWindow messages={[msg, msg2]} />);

        const li = component.find('li');

        expect(li).toHaveLength(2);
        expect(li.first().text().indexOf(msg.message)).toBeGreaterThan(-1);
    });

    afterEach(() => {
        console.error.restore();
    });
});