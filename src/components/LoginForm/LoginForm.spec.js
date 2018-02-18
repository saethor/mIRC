import React from 'react';
import LoginForm from './LoginForm.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('LoginForm tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should not render correctly when incorrect onSubmit prop', () => {
        shallow(<LoginForm onSubmit={0} />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should not render correctly when receiving no props', () => {
        shallow(<LoginForm />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should call the provided function with the inputted string on button click', () => {
        const testInput = 'username';
        let input = '';
        const component = shallow(<LoginForm onSubmit={(value) => { input = value }} />)
        
        component.find('input[type="text"]').first().simulate('input', { target: { value: testInput } });
        component.find('input[type="button"]').first().simulate('click');
        
        expect(input).toEqual(testInput);
    });

    afterEach(() => {
        console.error.restore();
    });
});