import React from 'react';
import UserList from './UserList.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('UserList tests', () => {
    let stub;
    
    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should render without any property', () => {
        shallow(<UserList />);

        expect(stub.notCalled).toBe(true);
    });

    it('should not render with invalid ops property', () => {
        shallow(<UserList ops={[]} />);

        expect(stub.calledOnce).toBe(true);
    })

    it('should not render with invalid users property', () => {
        shallow(<UserList users={[]} />);

        expect(stub.calledOnce).toBe(true);
    })

    afterEach(() => {
        console.error.restore();
    });
});