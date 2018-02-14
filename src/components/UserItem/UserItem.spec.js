import React from 'react';
import UserItem from './UserItem.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('UserItem tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should not render without required properties', () => {
        shallow(<UserItem />);

        expect(stub.called).toBe(true);
    });

    it('should render provided name property', () => {
        const name = 'me';
        const component = shallow(<UserItem key={0} name={name} />);

        let text = component.find('li').first().text();

        expect(text).toEqual(name);
    });
    
    it('should render admin with @ prefix', () => {
        const name = 'me';
        const component = shallow(<UserItem name={name} admin={true} />);
    
        let text = component.find('li').first().text();
    
        expect(text).toEqual(`@${name}`);
    });

    afterEach(() => {
        console.error.restore();
    });
});