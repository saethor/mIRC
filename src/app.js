import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';

// Temp
// import ChatWindow from './components/ChatWindow/ChatWindow.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:9000')
        };
    }
    render() {
        return (
            <div className="container">
                {/* <ChatWindow messages={messages} /> */}
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};


ReactDOM.render(<App />, document.getElementById('app'));
