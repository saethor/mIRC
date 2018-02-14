import React from 'react';
import UserList from './UserList.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('UserList tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });
    
    it('should not render with invalid type of user object', () => {
        shallow(<UserList users={ [0] } />);
    
        expect(stub.calledOnce).toBe(true);
    });

    it('should render with valid users property', () => {
        const user = { name: 'me', admin: true };
        shallow(<UserList users={[user]} />);

        expect(stub.notCalled).toBe(true);
    });

    it('should render all users in users property', () => {
        const user1 = { name: 'me1', admin: false };
        const user2 = { name: 'me2', admin: false };
        const component = shallow(<UserList users={[user1, user2]} />);

        let users = component.find('ul li');

        expect(users.length).toEqual(2);
        expect(users.first().text()).toEqual(user1.name);
    });

    it('should render admins with @ prefix', () => {
        const user = { name: 'me', admin: true };
        const component = shallow(<UserList users={[user]} />);

        let text = component.find('ul li').first().text();

        expect(text).toEqual(`@${user.name}`);
    });

    afterEach(() => {
        console.error.restore();
    });
});