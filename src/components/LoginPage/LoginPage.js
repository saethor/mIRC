import React from 'react';
import PropTypes from 'prop-types';
import InputPrompt from '../InputPrompt/InputPrompt.js';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validUser: false
        }
    }
    onLogin(username) {
        let { socket } = this.context;

        socket.emit('adduser', username, (ack) => {
            this.context.username = username;
            
            this.setState({
                validUser: ack
            });
        });
    }
    render() {
        if (this.state.validUser) {
            return (<Redirect to="/rooms" />);
        } else {
            return (
                <InputPrompt 
                    label="Choose a username: "
                    onSubmit={ (username) => this.onLogin(username) } 
                />
            )
        }
    }
}

LoginPage.contextTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};

export default LoginPage;