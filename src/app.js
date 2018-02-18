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
        this.state = {
            notifications: []
        }
    }
    getChildContext() {
        return {
            socket: socket,
        };
    }
    componentDidMount() {
        socket.on('recv_privatemsg', (username, message) => {
            console.log('msg from', username, message);
            let notifications = Object.assign([], this.state.notifications);
            notifications.unshift({title: `${username}: ${message}`, link: `/users/${username}`})
            this.setState({notifications})
        });
    }
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/" component={LoginContainer} />
                    <Route exact path="/rooms" component={RoomContainer} />
                    <Route path="/rooms/:room" render={({ match }) => (<ChatContainer room={match.params.room} />)} />
                    <Route path="/users/:user" render={({ match }) => (<ChatContainer room={match.params.user} privateMsg={true} />)} />
                </Switch>
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
};


ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
