import React from 'react';
import ChatContainer from './ChatContainer.js';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('ChatContainer tests', () => {
    let stub;

    beforeEach(() => {
        stub = sinon.stub(console, 'error');
    });

    it('should render', () => {
        shallow(<ChatContainer />);

        expect(stub.notCalled).toBe(true);
    });

    afterEach(() => {
        console.error.restore();
    });
});
