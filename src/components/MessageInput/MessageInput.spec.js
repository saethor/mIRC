import React from 'react';
import MessageInput from './MessageInput.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('MessageInput tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error');     
    });

    it('should not render when missing onSend prop', () => {
        shallow(<MessageInput />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should not render when provided wrong type of onSend prop', () => {
        shallow(<MessageInput onSend={'foo'} />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should render when provided onSend function', () => {
        shallow(<MessageInput onSend={() => 0} />);

        expect(stub.notCalled).toBe(true);
    });

    it('should call the provided function with the inputted string on button click', () => {
        const testInput = 'some message';
        let input = '';
        const component = shallow(<MessageInput onSend={(value) => { input = value }} />)
        
        component.find('#message-input').first().simulate('input', { target: { value: testInput } });
        component.find('#message-send').first().simulate('click');
        
        expect(input).toEqual(testInput);
    });

    afterEach(() => {
        console.error.restore();
    });
});