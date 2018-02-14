import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Temp
import ChatContainer from './components/ChatContainer/ChatContainer.js';

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
            <div className="container">
                <Router>
                    
                    <Route exact path="/" component={ChatContainer} />
                </Router>
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};


ReactDOM.render(<App />, document.getElementById('app'));
