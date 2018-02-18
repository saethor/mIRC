import React from 'react';
import { shallow } from 'enzyme';

import RoomItem from './RoomItem'

describe('RoomItem tests', () => {
    it('should render room name correctly', () => {
        const name = 'General';
        const component = shallow(<RoomItem name={name} onClick={() => console.error(name)} />)
        expect(component.find('li').first().text()).toBe('<Link />');
    });
});