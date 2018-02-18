import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './components/LoginContainer/LoginContainer.js';
import RoomContainer from './components/RoomContainer/RoomContainer.js';
import ChatContainer from './components/ChatContainer/ChatContainer.js';

const socket = socketClient('http://localhost:8080');

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            socket: socket,
        };
    }
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/" component={RoomContainer} />
                    <Route exact path="/rooms" component={RoomContainer} />
                    <Route path="/rooms/:room" render={({ match }) => (<ChatContainer room={match.params.room} />)} />
                </Switch>
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
};


ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
