import React from 'react';
import InputPrompt from './InputPrompt.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('InputPrompt tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should not render correctly when incorrect label prop', () => {
        shallow(<InputPrompt onSubmit={() => 0} label={() => 0} />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should not render correctly when incorrect onSubmit prop', () => {
        shallow(<InputPrompt onSubmit={0} label={ 'str' }/>);

        expect(stub.calledOnce).toBe(true);
    });

    it('should not render correctly when receiving no props', () => {
        shallow(<InputPrompt />);

        expect(stub.calledOnce).toBe(true);
    });

    it('should render correctly when receiving only onSubmit prop', () => {
        shallow(<InputPrompt onSubmit={ () => 0 } />);

        expect(stub.notCalled).toBe(true);
    });

    it('should have some default label text if label prop is not provided', () => {
        const component = shallow(<InputPrompt onSubmit={ () => 0 } />);

        let text = component.find("#input-label").first().text();

        expect(text.length).toBeGreaterThan(0);
    });

    it('should render provided label prop', () => {
        const label = 'test-label';
        const component = shallow(<InputPrompt onSubmit={() => 0} label={label} />)
        
        let text = component.find("#input-label").first().text();
        
        expect(text).toEqual(label);
    });
    
    it('should call the provided function with the inputted string on button click', () => {
        const testInput = 'username';
        let input = '';
        const component = shallow(<InputPrompt onSubmit={(value) => { input = value }} />)
        
        component.find('#input-prompt').first().simulate('input', { target: { value: testInput } });
        component.find('#input-prompt-btn').first().simulate('click');
        
        expect(input).toEqual(testInput);
    });

    afterEach(() => {
        console.error.restore();
    });
});