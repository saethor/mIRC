import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.js';
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validUser: false
        }
    }
    onLogin(username) {
        let { socket } = this.context;

        socket.emit('adduser', username, (ack) => {
            this.setState({
                validUser: ack
            });
        });
    }
    render() {
        const { validUser } = this.state;
        
        return validUser ? (<Redirect to="/rooms" />) : (<LoginForm onSubmit={ (username) => this.onLogin(username) } />);
    }
}

LoginContainer.contextTypes = {
    socket: PropTypes.object.isRequired,
};

export default LoginContainer;