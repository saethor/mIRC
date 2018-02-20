import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import NotificationItem from './NotificationItem';

describe('NotificationItem tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should not render without all props', () => {
        shallow(<NotificationItem ></NotificationItem>);

        expect(stub.called).toBe(true);
    });

    afterEach(() => {
        console.error.restore();
    });
});