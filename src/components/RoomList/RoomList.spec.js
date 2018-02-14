import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RoomList from './RoomList';

describe('RoomList tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should render correctly when recevied all props', () => {
        let rooms = [];
        const component = shallow(<RoomList rooms={rooms} />)
        expect(stub.notCalled).toBe(true);
    });

    it('should not render correctly  when receive wrong props', () => {
        shallow(<RoomList />);
        expect(stub.calledOnce).toBe(true);
    })

    it('should render render one room correctly', () => {
        const component = shallow(<RoomList rooms={[{name: "General"}]} />);
        expect(component.find('h3').text()).toEqual("General");
        expect(component.find('li').length).toEqual(1);
    });

    it('should render many rooms correctly', () => {
        const component = shallow(<RoomList rooms={[{ name: 'General' }, { name: 'CatGifs' }]} />);
        expect(component.find('h3').length).toEqual(2);
        expect(component.find('h3').first().text()).toEqual('General');
        expect(component.find('h3').last().text()).toEqual('CatGifs');
    });

    afterEach(() => {
        console.error.restore();
    });
});