import React from 'react';
import MessageItem from './MessageItem.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('Chat message tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });
    
    it('should not render without message property', () => {
        shallow(<MessageItem />);
        
        expect(stub.calledOnce).toBe(true);
    });
    
    it('should render properly with message property', () => {
        let message = { date: 'today', user: 'me', text: 'foo' };
        
        shallow(<MessageItem message={ message } />);
        
        expect(stub.notCalled).toBe(true);
    });
    
    afterEach(() => {
        console.error.restore();
    });
});