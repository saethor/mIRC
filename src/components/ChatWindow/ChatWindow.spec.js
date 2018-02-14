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

    afterEach(() => {
        console.error.restore();
    });
});