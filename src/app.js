import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Temp
import RoomContainer from './components/RoomContainer/RoomContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    render() {
        return (
            <Router>
                <Route exact path="/" component={RoomContainer} />
            </Router>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};


ReactDOM.render(<App />, document.getElementById('app'));
