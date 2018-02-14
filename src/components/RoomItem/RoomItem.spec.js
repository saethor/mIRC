import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import RoomItem from './RoomItem'

describe('RoomItem tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should render room name correctly', () => {
        const name = 'General';
        const component = shallow(<RoomItem name={name} onClick={() => console.error(name)} />)
        expect(component.find('h3').first().text()).toBe(name);
    });

    it('should trigger onClick on click', () => {
        const name = 'General';
        const component = shallow(<RoomItem name={name} onClick={() => console.error(name)} />)

        component.find('ul').first().simulate('click');
        expect(stub.calledOnce).toBe(true);
    })

    afterEach(() => {
        console.error.restore()
    });
});