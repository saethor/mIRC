import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage.js';
import RoomContainer from './components/RoomContainer/RoomContainer.js';

const socket = socketClient('http://localhost:8080');

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            socket: socket,
            username: ''
        };
    }
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/rooms" component={RoomContainer} />
                </Switch>
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};


ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
