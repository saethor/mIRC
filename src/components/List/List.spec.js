import React from 'react';
import List from './List.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('List tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should render children', () => {
        const child = 'foo';
        const component = shallow(<List><li>{child}</li></List>);

        let text = component.find('li').first().text();

        expect(stub.notCalled).toBe(true);
        expect(text).toEqual(child);
    });

    it('should apply className prop to its container element', () => {
        const className = 'foo';
        const component = shallow(<List className={className}></List>);

        let el = component.find(`.${className}`).first();

        expect(stub.notCalled).toBe(true);
        expect(el.length).toEqual(1);
    });

    it('should not render with invalid className property', () => {
        shallow(<List className={0}></List>);

        expect(stub.calledOnce).toBe(true);
    });

    afterEach(() => {
        console.error.restore();
    });
});