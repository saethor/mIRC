import React from 'react';
import InputPrompt from './InputPrompt.js';
import { shallow } from 'enzyme';

describe('InputPrompt tests', () => {
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
});